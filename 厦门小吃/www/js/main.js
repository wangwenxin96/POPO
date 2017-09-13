$(function(){
    // 左侧导航条的效果切换
    $(".left li").click(function(){
        $(this).parent().find("li").removeClass("cur")//删除li的cur样式
        $(this).addClass("cur")//为当前的标签添加样式

        var tmpType = $(this).find("a").data("type")//获取商品里的分类值
        var tmpData = arrAllProducts.find(function(item){
            if(item.type == tmpType){
                return item
            }
        })
        // 初始化页面的html代码
        initPList(tmpData.products)
    })

    // 创建一个空的数组，用于存储数据
    var arrAllCart = []

    // 通过on绑定事件，处理一下动态添加的标签
    // 设置增加数量的按钮
    $("#pList").on("click",".p-add",function(){
        var tmpId = $(this).data("pid")//获取当前标签data-pid的属性值
        dalPNum("add",tmpId)
    })

    $("#pList").on("click",".p-reduce",function(){
        var tmpId = $(this).data("pid")
        dalPNum("reduce",tmpId);
    })

    // 根据操作的类型和产品的id，来修改购买的数量
    function dalPNum(type,tmpId){
        var $tagPNum = $("#pNum" + tmpId)//获取当前商品的商品数量的标签
        var tmpNum = Number($tagPNum.data("pnum"))//把当前的数量转化为数字

        if(type == "add"){
            tmpNum += 1//修改数量值
        }else{
            tmpNum -= 1
        }

        if(tmpNum < 0){
            return
        }
        $tagPNum.data("pnum",tmpNum)//修改当前订购数量的值
        $tagPNum.text(tmpNum)//修改显示数量的值


        // 创建一个空对象，然后为其赋值
        var obj = {}
            obj.pid = tmpId
            obj.count = tmpNum
            obj.price = Number($tagPNum.data("price"))//获取当前商品的价格
        var pIndex = arrAllCart.findIndex(function(item){
            return item.pid == obj.pid
        })//获取当前的商品所在购物车中商品数组的索引值
        if(pIndex > -1){
            arrAllCart[pIndex] = obj//存在进行替换操作
        }else{
            arrAllCart.push(obj)//不存在就进行插入操作
        }
        // console.dir(arrAllCart)
        var sumCount = 0;//总数量
        var sumPrice = 0;//总价格
        arrAllCart.forEach(function(item){
            sumCount += item.count
            sumPrice += (item.count * item.price)
        })
        $("#sumPCouent").text(sumCount)
        $("#sumPPrice").text(sumPrice.toFixed(2))//显示的时候保留两位小数
    }
    

    // 初始化html页面
    function initPList(data){
        var strHtml = ""
        data.forEach(function(item) {
            var tmpP = arrAllCart.find(function(p){
                return p.pid == item.id
            })
            // 记录商品的数量值，默认为0，如果购物车中存在，那么就使用购物车中的值
            var tmpCount = 0

            if(tmpP){
                tmpCount = tmpP.count
            }

            strHtml += `<li>
                            <div class="product-item">
                                <img class="product-img" src="${item.img}" alt="${item.name}">
                                <h4 class="product-title">${item.name}</h4>
                                <p class="product-desc">${item.desc}</p>
                                <span class="product-price"><i>${item.price}</i>元</span>
                                <div class="action">
                                    <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-reduce">-</a>
                                    <span class="p-num" id="pNum${item.id}" data-pid="${item.id}" data-price="${item.price}" data-pnum="${tmpCount}">${tmpCount}</span>
                                    <a href="javascript:void(0)" data-pid="${item.id}" class="p-btn-car p-add">+</a>
                                </div>
                            </div>
                        </li>`
        })
        $("#pList").html(strHtml)
    }
    initPList(arrAllProducts[0].products)
    // 当点击这个确认按钮的时候触发
    $(".btn-sure-order").click(function(){
        // 把所有加入到购物车里面的内容放到cookie里面保存
        // 这个地方需要使用jquery.cookie.js插件
        // 下载地址：https://github.com/carhartl/jquery-cookie
        // path:路径，在此处设置，整个网站有效
        // expires:信息存储的时间，此处设置有效期为7天
        $.cookie("shopcart",JSON.stringify(arrAllCart),{path:"/",expires:7})
        window.location.href = "order.html"//完成页面跳转
    })
})
