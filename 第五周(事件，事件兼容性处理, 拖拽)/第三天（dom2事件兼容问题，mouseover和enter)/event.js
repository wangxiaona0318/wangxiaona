/**
 * Created by Administrator on 2016-11-4.
 */
function on(ele,type,fn){
    if(!ele['A'+type]){
        ele['A'+type] = [];
    }
    if(ele['A'+type]){
        for(var i = 0 ; i < ele['A'+type].length; i++){
            if(ele['A'+type][i] == fn){
                return;
            }
        }
    }
    ele['A'+type].push(fn);
    bind(ele,type,run);
}
function off(ele,type,fn){
    if(ele['A'+type]){
        for(var i=0;i<ele['A'+type].length;i++){
            if(ele['A'+type][i]==fn){
                ele['A'+type][i]=null;
                break;
            }
        }
    }
}
function run(e){
    e = e || window.event;
    if(e.srcElement){
        e.target = e.srcElement;
    }
    var events = e.target['A'+e.type];
    for(var i=0; i<events.length; i++){
        if(events[i]){
            events[i].call(e.target);
        }else{
            events.splice(i,1);
            i--;
        }
    }
}
function bind(ele,type,fn){
    if(ele.addEventListener){
        ele.addEventListener(type,fn);
        return;
    }
    var tempFn = function (){
        fn.call(this);//解决fn方法中的this问题，让this为ele
    }
    tempFn.origin = fn;
    if(!ele['my'+type]) ele['my'+type] = [];
    var arr = ele['my'+type];
    for(var i = 0; i < arr.length; i++){
        if(arr[i].origin == fn){
            return;
        }
    }
    arr.push(tempFn);
    ele.attachEvent('on'+type,tempFn);//fn方法中的this是window。
}

function unbind(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn);
        return;
    }
    if(ele['my'+type]){
        for(var i = 0; i < ele['my'+type].length; i++){
            if(ele['my'+type][i].origin == fn){
                ele.detachEvent('on'+type,ele['my'+type][i]);
                ele['my'+type].splice(i,1);
                break;
            }
        }
    }
}