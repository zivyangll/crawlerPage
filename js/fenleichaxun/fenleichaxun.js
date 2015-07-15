// 日期
//q_source
//58同城：0
//百姓网：1
//赶集网：2
//跳蚤市场：3
//淘宝二手：4
//得意生活：6
//本地宝：5
//豆瓣同城：7
//大麦网：8
//新浪微博：9
//今日头条：10
//途牛网：11
//阿里旅游：12
//帮帮网：13
//
//
//q_topicType  新类型n
//未分类 0
//案件 1
//民生 2
//人员 3
//服务 4
//管理 5
//社会 6
//销赃 7
// 获取总数：
//http://202.114.114.34:8878/yuqing/servlet_query_total_records?topic_type=0
//
//
//q_source_category 旧类型
//百姓生活  4
//旅游 6
//社会新闻 1
//演出活动 5
//楼房交易 2
//商场促销 3
//销赃分析 7

var clickStartTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}

var clickEndTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}
function getInformation(){
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    var sampleLoc = $("#quyu").find("option:selected").text();
    var detailleLoc = $("#remenshangquan").find("option:selected").text();
    var sourcetype = $("#sourcetype").find("option:selected").index();
    var canshu = "&start_date="+startTime+"&end_date="+endTime+"&location="+sampleLoc+"&detail_location="+detailleLoc;
    getSummaryTable(sourcetype,canshu);

}

function init(){
    //加载页面
    $('#shclProgress').shCircleLoader({color:"blue"});

    //初始化页面， 未分类
    getSummaryTable(0,"");

    /**
     * 点击导航栏，切换表格内容
     */
    var $div_li = $(".topbar li");
    $div_li.click(function(){
        $(this).addClass("selected")            //当前<li>元素高亮
            .siblings().removeClass("selected");  //去掉其它同辈<li>元素的高亮
        var index =  $div_li.index(this)-1;  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        if(index > -1){
            $("tbody:eq("+index+")").show();
            $("tbody:gt("+index+")").hide();
            $("tbody:lt("+index+")").hide();
            getSummaryTable(index,"");
        }
    })
    /**
     * 内容过滤
     */
    $("#filterName").keyup(function(){
        $("table tbody tr")
            .hide()
            .filter(":contains('"+( $(this).val() )+"')")
            .show();
    }).keyup();

    $("#filterName").focus(function(){
        $(this).addClass("focus");
        if($(this).val() ==this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });

    $("#quyu").change(function(){

        /**
         * 热门商圈
         */
        var hongshanqu = // 洪山区
            ["全部,南湖,光谷,东湖高新技术开发区,东湖高新技术,广埠屯,虎泉,街道口,鲁巷,东湖区,黄家湖大学城,徐东大街,白沙洲,光谷创业街,石牌岭"];
        var wuchangqu = // 武昌区
            ["全部,司门口,徐东销品茂,积玉桥,街道口,东湖区,湖北大学,阅马场,汉街,徐东大街,丁字桥,中南,洪山广场,水果湖,武昌火车站,洪山亚贸,石牌岭,大东门,小东门"];
        var jianghanqu = // 江汉区
            ["全部,江汉路新佳丽广场,江汉路新佳丽,江汉路步行街,菱角湖,常青路,西北湖,武汉广场,香港路,汉口火车站,新民众乐园,新华路,西园,青年路,京汉大道友谊路,中山大道友谊南路,中山大道友谊,江滩,沿江一号,六渡桥,王家墩"];
        var jiangxiaqu = // 江夏区
            ["全部,藏龙岛,大花岭,梁子湖,庙山,纸坊"];
        var jianganqu = // 江岸区
            ["全部,江汉路步行街,大智路,二七,后湖,南京路,台北路,竹叶山,香港路,百步亭,三阳路,黄浦路,球场街,循礼门,武汉天地,解放公园,澳门路,客运港,知行学院"];
        var hanyangqu = // 汉阳区
            ["全部,沌口,王家湾,钟家村,墨水湖,琴台大道,汉阳大道,鹦鹉大道,琴台,腰路堤"];
        var qingshanqu = // 青山区
            ["全部,奥山,钢都花园,工业路,红钢城,沿港路,欢乐大道,仁和路,建二,八大家,铁机,柴林花园,武钢厂区,武东,武汉火车站,杨春湖,余家头,四美塘"];
        var qiaokouqu = // 硚口区
            ["全部,古田路,汉西,硚口路,武胜路凯德广场,解放大道航空路,崇仁路,利济路,武胜路,游艺路"];
        var dongxihuqu = //东西湖区
            ["全部,东西湖"];
        var huangpiqu = // 黄陂区
            ["全部,黄陂"];
        var xinzhouqu = //新洲区
            ["全部,武生院,工程学院,阳逻街区,邾城街 "];
        var caidianqu = //蔡甸区
            ["全部,蔡甸"];
        var hannanqu = //汉南区
            ["全部,汉南"];
        var qita = // 其他
            ["其他"];
        var remenshangquan = [hongshanqu,wuchangqu,jianghanqu,jiangxiaqu,jianganqu,hanyangqu,qingshanqu,qiaokouqu,dongxihuqu,huangpiqu,xinzhouqu,caidianqu,hannanqu,qita];

        selectText = $("#quyu").find("option:selected").text();
        switch(selectText){
            case "洪山区":
                getList(hongshanqu);
                break;
            case "武昌区":
                getList(hongshanqu);
                break;
            case "江汉区":
                getList(jianghanqu);
                break;
            case "江夏区":
                getList(jiangxiaqu);
                break;
            case "江岸区":
                getList(jianganqu);
                break;
            case "汉阳区":
                getList(hanyangqu);
                break;
            case "青山区":
                getList(qingshanqu);
                break;
            case "硚口区":
                getList(qiaokouqu);
                break;
            case "东西湖区":
                getList(dongxihuqu);
                break;
            case "黄陂区":
                getList(huangpiqu);
                break;
            case "新洲区":
                getList(xinzhouqu);
                break;
            case "蔡甸区":
                getList(caidianqu);
                break;
            case "汉南区":
                getList(hannanqu);
                break;
            case "其他":
                getList(qita);
                break;

        }
    });


}


function getList(listArray) {
    listArray = listArray[0].toString().split(",")
    $("#remenshangquan").empty();

    for(var i = 0; i < listArray.length; i++){
        $("#remenshangquan").append("<option value='Value'>"+listArray[i]+"</option>");
    }
}


function getSummaryTable(topicType,canshu) {
    var listTypeArray = ["未分类","案件","民生","人员","服务","管理","社会","销赃"];
    var didian = ["武昌区","江汉区","江岸区","汉阳区","青山区","硚口区","汉南区","洪山区","新洲区","东西湖区","其他"]
    var listtypeArray = ["weifenlei","anjian","minsheng","renyuan","fuwu","guanli","shehui","xiaozang"];
    $("#"+listtypeArray[topicType]).html("");
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_query_by_topic?topic_type="+topicType+"&start_num=0&total_num=100"+canshu, function (bangbangRawData) {//概要页面数据
        $("#shclProgress").hide();
            //更改li颜色
        $(".topbar a").css("color","black");
        $(".topbar a:eq("+topicType+")").css("color","blue");

        $("#bangbangList").empty();
        var bangbangData = JSON.parse(bangbangRawData);
        var bangbangImage = "";


        for (var i = 1; i < bangbangData.length; i++) {
            if(bangbangData[i].q_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/"+ bangbangData[i].q_id +".jpg"
            }

            var bangbangContent = bangbangData[i].q_content;
            if(bangbangContent.length > 111){
                bangbangContent = bangbangContent.substr(0,110)
            }

            var sourcePage = "";
            switch (bangbangData[i].q_source){
                case 0:sourcePage = "58同城";break;
                case 1:sourcePage = "百姓网";break;
                case 2:sourcePage = "赶集网";break;
                case 3:sourcePage = "跳蚤市场";break;
                case 4:sourcePage = "淘宝二手";break;
                case 5:sourcePage = "得意生活";break;
                case 6:sourcePage = "本地宝";break;
                case 7:sourcePage = "豆瓣同城";break;
                case 8:sourcePage = "大麦网";break;
                case 9:sourcePage = "新浪微博";break;
                case 10:sourcePage = "今日头条";break;
                case 11:sourcePage = "途牛网";break;
                case 12:sourcePage = "阿里旅游";break;
                case 13:sourcePage = "帮帮网";break;
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].q_title +"</td>" +   //新闻标题
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + bangbangContent + "</td>" +   //新闻内容
                "<td style='height: 70px'>" + bangbangData[i].q_pubTime+ "</td>" +   //发布时间
                "<td style='height: 70px'>" + didian[parseInt(10*Math.random())]+ "</td>" +   //地点
                "<td style='height: 70px'>" + sourcePage + "</td>" +   //来源
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].q_focus_num + "</td>" +   //关注度
                "<td style='height: 70px'><a target='_blank' href = '" + "'>点击查看详细信息</a></td>" +    //详细信息
                "<td style='height: 70px'>" + listTypeArray[bangbangData[i].q_topicType] + "</td>" +   //类别
                "<td style='height: 70px'><select class='changeSelect' style='width:60px;height:20px;'><option>案件</option>" +
                "<option>民生</option><option>人员</option><option>服务</option><option>管理</option>" +
                "<option>社会</option><option>销赃</option></select><button class='changeType'>确定</button></td>"+ //移动到
                "<td style='height: 70px;display: none' >" + bangbangData[i].q_source_category + "</td>" +   //老类型q_source_category
                "<td style='height: 70px;display: none' >" + bangbangData[i].q_id + "</td>" ;   //id
            $("#"+listtypeArray[topicType]).append(a);
        }

        $(".changeSelect").change(function(){//select变化事件
        });

        $(".changeType").click(function(e){//确定按钮事件
            var oldTyep = $(e.target).parent().next().text();
            var newType = $(e.target).prev().find("option:selected").index()+1;
            var id      = $(e.target).parent().next().next().text();
            $.post("http://202.114.114.34:8878/yuqing/servlet_query_change_topic?id="+id+"&source_type="+oldTyep+"&new_type="+newType,function(data){
                console.log(data.toString())
                if(data.toString() == "[true]"){
                    //alert("修改成功");
                    $(e.target).parent().parent().hide();
                    //$(e.target).parent().prev().text(listTypeArray[parseInt(newType)]);
                }
            })


        });

        //设置分页
        $("div.activeHolder").jPages({
            containerID: listtypeArray[topicType], //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 10,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画

        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#weiboInfo tr").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#weiboInfo tr:gt(0)").bind("click",function(){
            $("#weiboInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
    });
}