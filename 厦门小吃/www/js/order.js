// 页面初始化的时候，输出
console.log($.cookie("shopcart"));

$(function(){
    // 当点击a标签的时候触发事件
    $(".order-detail").click(function(){
        $(".order-produce").toggle(1500)
    })

    // 格式化一下购物车的数据
    // 把cookie里面存储的数据转化为js对象
    var shopCart = JSON.parse($.cookie("shopcart"))
    var strHtml = ""//初始化一个空的字符串，用于放置字符串拼接
    var sumPrice = 0;//初始化总价为0
    var sumCount = 0//初始化总数量为0
    var allP = []//用于存储所有的商品数据

    arrAllProducts.forEach(function(item) {
        allP = allP.concat(item.products)//拼接一下商品的数据

    });
    shopCart.forEach(function(item){
        // 当前cookie中的商品id的对应的商品
        var temProduct = allP.find(function(p){
            return p.id == item.pid
        })

        // 总价=单价 * 数量
        sumPrice += item.price * item.count
        // 数量自增
        sumCount += item.count

        // 字符串拼接一下，显示购物车的商品详情
        strHtml += `<div class="o-p-item">
                        <ul>
                            <li><img class="o-p-img" src="${temProduct.img}" alt="${temProduct.name}"></li>
                            <li>${temProduct.name}</li>
                            <li class="o-p-price"><em>${item.price.toFixed(2)}</em>X${item.count}</li>
                        </ul>
                    </div>`
    })
    $(".order-produce").html(strHtml)
    $("#orderPrice").text(sumPrice.toFixed(2))

    var orders = []//创建一个空的数组，将数据保存到localStorage
    if(localStorage.orders){
        // 将json对象转化为js字符串
        orders = JSON.parse(localStorage.orders)
    }


    // 当点击确认订单的时候，触发。
    $('#btnSub').click(function(e){
        var order = {};
        order.oid = Date.now();
        // val() 方法返回或设置被选元素的值。
        // 元素的值是通过 value 属性设置的。该方法大多用于 input 元素。
        // 如果该方法未设置参数，则返回被选元素的当前值。
        var name = $('#txtName').val();
        var mobile = $('#txtMoblie').val();
        var address = $('#txtAddress').val();
        var remarks = $('#txtRemarks').val();

        if(name && mobile && address){
            order.receiver = name;
            order.mobile = mobile;
            order.address = address;
            order.remarks = remarks;
            order.plist = shopCart;
        }else{
            alert('请输入购买人的详细信息');
            e.preventDefault()
            return
        }
        orders.push(order);
        localStorage.orders = JSON.stringify(orders);
        console.dir(localStorage.orders);
    })

})