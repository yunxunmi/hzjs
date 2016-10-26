base = function(){
	this.isJson = function(obj){
		try{
			var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
			return isjson;
		}catch(e){return false;}
	};
	this.isString = function(obj){
		try{  
			return typeof(obj) == "string";
		}catch(e){return false;}
	};
	this.isFunction = function(obj){
		try{  
			return typeof(obj) == "function";
		}catch(e){return false;}
	};
	this.isArray = function(obj){
		try{  
			return obj instanceof Array;
		}catch(e){return false;}
	};
	this.attr = function(_this, args, numargs)
    {
		var results = [];
		for (var i=0;i<_this.length;i++)
		{
			if (numargs==1)
			{
				if (nb.isString(args[0]))
				{
                    results.push(_this[i].getAttribute(args[0]));
				}
				if (nb.isFunction(args[0]))
				{
                    results.push(args[0](this));
                    //break;
				}
				if (nb.isJson(args[0]))
				{
					try{
						for(var item in args[0])
                            _this[i].setAttribute(item, args[0][item]);
					}catch(e){
                        results.push(false);
					}
				}
			}
			if (numargs==2)
			{
				if (nb.isString(args[0]))
				{
					if (nb.isString(args[1]))
					{
                        results.push(_this[i].setAttribute(args[0], args[1]));
					}
					if (nb.isFunction(args[1]))
					{
                        results.push(_this[i].setAttribute(args[0], args(args)));
					}
				}
			}
		}
        if (_this.length==1)
        {
            if (results.length > 0)
                return results[0];
            else
                return null;
        }
        else
            return results;
	}
    this.removeattr = function(_this, args, numargs)
    {
        var results = [];
        for (var i=0;i<_this.length;i++) {
            if (nb.isString(args[0])) {
                if (_this[i].hasAttribute(args[0]))
                    results.push(_this[i].removeAttribute(args[0]));
            }
            if (nb.isArray(args[0])) {
                for (var j=0;j<args[0].length;j++)
                    if (nb.isString(args[0][j]))
                        if (_this[i].hasAttribute(args[0][j]))
                            results.push(_this[i].removeAttribute(args[0][j]));
            }
        }
        if (_this.length==1)
        {
            if (results.length > 0)
                return results[0];
            else
                return null;
        }
        else
            return results;
    }
    this.html = function(_this, args, numargs)
    {
        var results = [];
        for (var i=0;i<_this.length;i++) {
            if (numargs==1){
                if (nb.isString(args[0])) {
                    _this[i].innerHTML = args[0];
                }
            }
            else{
                results.push(_this[i].innerHTML);
            }
        }
        if (_this.length==1)
        {
            if (results.length > 0)
                return results[0];
            else
                return null;
        }
        else
            return results;
    }
	this.hascss = function(_this, args, numargs)
	{
		var results = [];
		for (var i=0;i<_this.length;i++) {
			if (nb.isString(args[0])) {
				if (_this[i].hasAttribute(args[0]))
					results.push(_this[i].removeAttribute(args[0]));
			}
			if (nb.isArray(args[0])) {
				for (var j=0;j<args[0].length;j++)
					if (nb.isString(args[0][j]))
						if (_this[i].hasAttribute(args[0][j]))
							results.push(_this[i].removeAttribute(args[0][j]));
			}
		}
		if (_this.length==1)
		{
			if (results.length > 0)
				return results[0];
			else
				return null;
		}
		else
			return results;
	}
	this.css = function(_this, args, numargs)
	{
		var results = [];
		for (var i=0;i<_this.length;i++)
		{
			if (numargs==1)
			{
				if (nb.isString(args[0]))
				{
					results.push(_this[i].getAttribute(args[0]));
				}
				if (nb.isFunction(args[0]))
				{
					results.push(args[0](this));
					//break;
				}
				if (nb.isJson(args[0]))
				{
					try{
						for(var item in args[0])
							_this[i].setAttribute(item, args[0][item]);
					}catch(e){
						results.push(false);
					}
				}
			}
			if (numargs==2)
			{
				if (nb.isString(args[0]))
				{
					if (nb.isString(args[1]))
					{
						results.push(_this[i].setAttribute(args[0], args[1]));
					}
					if (nb.isFunction(args[1]))
					{
						results.push(_this[i].setAttribute(args[0], args(args)));
					}
				}
			}
		}
		if (_this.length==1)
		{
			if (results.length > 0)
				return results[0];
			else
				return null;
		}
		else
			return results;
	}
	this.removecss = function(_this, args, numargs)
	{
		var results = [];
		for (var i=0;i<_this.length;i++) {
			if (nb.isString(args[0])) {
				if (_this[i].hasAttribute(args[0]))
					results.push(_this[i].removeAttribute(args[0]));
			}
			if (nb.isArray(args[0])) {
				for (var j=0;j<args[0].length;j++)
					if (nb.isString(args[0][j]))
						if (_this[i].hasAttribute(args[0][j]))
							results.push(_this[i].removeAttribute(args[0][j]));
			}
		}
		if (_this.length==1)
		{
			if (results.length > 0)
				return results[0];
			else
				return null;
		}
		else
			return results;
	}
};
nb = new base();
(function(window){
    var $ = function(selector){
		this.name = "$";
		this.Author = "黄智";
		this.nb = new base();
        if (selector==null || selector.length==0){
            return this;
        }
		else
		{
			objs = document.querySelectorAll(selector);
			if (objs.length>1){
                objs.attr = function (args) {
                    return nb.attr(this, arguments, arguments.length);
                }
                objs.removeattr = function (args) {
                    return nb.removeattr(this, arguments, arguments.length);
                }
                objs.html = function (args) {
                    return nb.html(this, arguments, arguments.length);
                }
				objs.hascss = function (args) {
					return nb.hascss(this, arguments, arguments.length);
				}
				objs.css = function (args) {
					return nb.css(this, arguments, arguments.length);
				}
				objs.removecss = function (args) {
					return nb.removecss(this, arguments, arguments.length);
				}
				return objs;
			}
			else if (objs.length==1){
                objs[0].attr = function (args) {
                    return nb.attr(objs, arguments, arguments.length);
                }
                objs[0].removeattr = function (args) {
                    return nb.removeattr(objs, arguments, arguments.length);
                }
                objs[0].html = function (args) {
                    return nb.html(objs, arguments, arguments.length);
                }
				objs[0].hascss = function (args) {
					return nb.hascss(objs, arguments, arguments.length);
				}
				objs[0].css = function (args) {
					return nb.css(objs, arguments, arguments.length);
				}
				objs[0].removecss = function (args) {
					return nb.removecss(objs, arguments, arguments.length);
				}
                return objs[0];
			}
			else return null;
		}
        this.test2 = function(selector){
            alert(selector);
        };
    };
	$.ltrim = function (str)
	{
		var i;
		for(i=0;i<str.length;i++)
		{
			if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
		}
		str=str.substring(i,str.length);
		return str;
	}
	$.rtrim = function (str)
	{
		var i;
		for(i=str.length-1;i>=0;i--)
		{
			if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
		}
		str=str.substring(0,i+1);
		return str;
	}
	$.trim = function (str)
	{//$.trim(' test ')
		return $.ltrim($.rtrim(str));
	}
	$.parseJSON = function (str)
	{//$.parseJSON('{"pc":22, "lc":10}')
		obj = JSON.parse(str);
		obj.toString = function()
		{
			return JSON.stringify(this);
		}
		return obj;
	}
	$.toJSONString = function (obj)
	{//$.parseJSON('{"pc":22, "lc":10}').toJSONString()
		return JSON.stringify(obj);
	}
	$.formatDatetime = function(date, fmt)   
	{ //$.formatDatetime(new Date(), 'yyyy-MM-dd hh:mm:ss')
	  var o = {   
		"M+" : date.getMonth()+1,                 //月份   
		"d+" : date.getDate(),                    //日   
		"h+" : date.getHours(),                   //小时   
		"m+" : date.getMinutes(),                 //分   
		"s+" : date.getSeconds(),                 //秒   
		"q+" : Math.floor((date.getMonth()+3)/3), //季度   
		"S"  : date.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	}
	$.split = function (str, separator)
	{
		return str.split(separator);
	}
	$.getURLParam = function(h,e){var g="";var f=e.toLowerCase();if(f.indexOf("?")>-1){var d=f.substr(f.indexOf("?")+1).toLowerCase();var a=d.split("&");for(var c=0;c<a.length;c++){if(a[c].indexOf(h.toLowerCase()+"=")==0){var b=a[c].split("=");g=b[1];break;}}}return g;}
	$.isJson = function(obj){
		try{
			var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
			return isjson;
		}catch(e){return false;}
	};
	$.isString = function(obj){
		try{  
			return typeof(obj) == "string";
		}catch(e){return false;}
	};
	$.isFunction = function(obj){
		try{  
			return typeof(obj) == "function";
		}catch(e){return false;}
	};
	$.isArray = function(obj){
		try{  
			return obj instanceof Array;
		}catch(e){return false;}
	};
	$.ready = function (fn){
		if ( document.readyState === "complete" ){
			setTimeout( fn, 100 );
		}
		else if ( document.addEventListener ) {
            document.addEventListener( "DOMContentLoaded", fn, false );
        }
		else {
            document.attachEvent( "onreadystatechange", fn );
		}
	}
	$.toLower = function (str){
		return str.toLowerCase();
	}
	$.toUpper = function (str){
		return str.toUpperCase();
	}
	$.chineseNumber = function (num)
	{
		if (isNaN(num) || num > Math.pow(10, 12))
			return ""
		var cn = "零壹贰叁肆伍陆柒捌玖"
		var unit = new Array("拾百千", "分角")
		var unit1 = new Array("万亿", "")
		var numArray = num.toString().split(".")
		var start = new Array(numArray[0].length - 1, 2)

		function toChinese(num, index)
		{
			var num = num.replace(/\d/g, function($1)
			{
				return cn.charAt($1) + unit[index].charAt(start-- % 4 ? start % 4 : -1)
			})
			return num
		}

		for (var i = 0; i < numArray.length; i++)
		{
			var tmp = ""
			for (var j = 0; j * 4 < numArray[i].length; j++)
			{
				var strIndex = numArray[i].length - (j + 1) * 4
				var str = numArray[i].substring(strIndex, strIndex + 4)
				var start = i ? 2 : str.length - 1
				var tmp1 = toChinese(str, i)
				tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "")
				tmp1 = tmp1.replace(/^壹拾/, "拾")
				tmp = (tmp1 + unit1[i].charAt(j - 1)) + tmp
			}
			numArray[i] = tmp
		}

		numArray[1] = numArray[1] ? numArray[1] : ""
		numArray[0] = numArray[0] ? numArray[0] + "元" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "")
		numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1] + "整"
		return numArray[0] + numArray[1]
	}
	$.floor = function(arg){
		return Math.floor(arg)
	}
	$.ceil = function(arg){
		return Math.ceil(arg)
	}
	$.round = function(arg){
		return Math.round(arg)
	}
	$.floatFixed = function(arg,order){
		return arg.toFixed(order)
	}
	$.floatMul = function(arg1,arg2){
		var m=0,s1=arg1.toString(),s2=arg2.toString();
		try{
			m+=s1.split(".")[1].length;
		}catch(e){}
		try{
			m+=s2.split(".")[1].length;
		}catch(e){}
		return Number(s1.replace(".","")*s2.replace(".","")/Math.pow(10,m))
	}
	$.floatAdd = function(arg1,arg2){
		var r1=0,r2=0,s1=arg1.toString(),s2=arg2.toString();
		try{
			r1=s1.split(".")[1].length;
		}catch(e){}
		try{
			r2=s2.split(".")[1].length;
		}catch(e){}
		m=Math.pow(10,Math.max(r1,r2))
		return (arg1*m+arg2*m)/m
	}
	$.floatSub = function(arg1,arg2){
		var r1,r2,m,n;
		try{
			r1=arg1.toString().split(".")[1].length
		}catch(e){r1=0}
		try{
			r2=arg2.toString().split(".")[1].length
		}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2));
		n=(r1>=r2)?r1:r2;
		return ((arg1*m-arg2*m)/m).toFixed(n);
	}
    $.back = function()
    {
        historys  = JSON.parse(localStorage.getItem("historys"));
        if (historys.length>0)
        {
            var idx = historys.indexOf(window.location.href);
            if (idx)
            {
                window.location.href = historys[idx-1];
            }
        }
    }
    $.forward = function()
    {
        historys  = JSON.parse(localStorage.getItem("historys"));
        if (historys.length>0)
        {
            var idx = historys.indexOf(window.location.href);
            if (idx<historys.length-1)
                window.location.href = historys[idx+1];
        }
    }
    $.strTohtmlObject = function(str)
    {
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;
        if (htmlObject.childNodes.length==1)
            return htmlObject.childNodes[0];
        else
            return htmlObject.childNodes;
    }
    String.prototype.tohtmlObject = function(){return $.strTohtmlObject(this)}
    window.$ = $;
    $.ready(function(){
        if (localStorage.getItem("historys"))
        {
            historys  = JSON.parse(localStorage.getItem("historys"));
            if (historys.indexOf(window.location.href)<0)
                historys[historys.length] = window.location.href;
        }
        else
            historys[historys.length] = window.location.href;
        localStorage.setItem("historys", JSON.stringify(historys));
    });
})(window);
