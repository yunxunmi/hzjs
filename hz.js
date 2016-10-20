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
			objs[0].test3 = function()
			{
				alert('test3');
			};
			objs[0].attr = function(args)
			{
				var numargs = arguments.length;
				if (numargs==1)
				{
					if (nb.isString(args))
					{
						return this.getAttribute(args);
					}
					if (nb.isFunction(args))
					{
						return args(this);
					}
					if (nb.isJson(args))
					{
						try{
							for(var item in args)
								this.setAttribute(item, args[item]);
							return true;
						}catch(e){
							//console.log(e.message);
							return false;
						}
					}
				}
				if (numargs==2)
				{
					if (nb.isString(arguments[0]))
					{
						if (nb.isString(arguments[1]))
						{
							return this.setAttribute(arguments[0], arguments[1]);
						}
						if (nb.isFunction(arguments[1]))
						{
							return this.setAttribute(arguments[0], args(args));
						}
					}
				}
				//console.log(numargs);
				//console.log(typeof(args));
			}
			return objs[0];
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
    window.$ = $;
})(window);
