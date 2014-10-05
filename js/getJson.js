var apiToken = "kp53f58b84f1bf35.99066470";
var musicP={
	nowListId:"",
	nowPlayNo:"",
	typeList:[],
	playList:{}
};

musicP.getTypeListJson = function(){
	if(musicP.typeList.length==0)
	{
		$.get("http://api.kptaipei.tw/v1/musics/",{"accessToken":apiToken},function(getJson){
			if(getJson.isSuccess)
			{
				musicP.typeList = getJson.data;
				console.log(musicP.typeList);
				for(var temp=0;temp<musicP.typeList.length;temp++)
				{
					musicP.getPlayListJson(musicP.typeList[temp].id);
				}
			}
			else
			{
				//TODO alert
				console.log("error: get typelist error");
			}
			new kendo.mobile.Application(document.body);
		},"json");
	}
};

musicP.getPlayListJson = function(typeId){
	if(musicP.playList[typeId]===undefined)
	{
		$.get("http://api.kptaipei.tw/v1/musics/"+typeId,{"accessToken":apiToken},function(getJson){
			if(getJson.isSuccess)
			{
				musicP.playList[typeId] = getJson.data;
				//版面需要 增加no
				for(var temp=0;temp<musicP.playList[typeId].length;temp++)
				{
					musicP.playList[typeId][temp].no = temp;
				}
				console.log(musicP.playList);
			}
			else
			{
				//TODO alert
				console.log("error: get playlist error");
			}
		},"json");
	}
};

musicP.changeNowList = function(typeId)
{
	if(this.nowListId != typeId)
	{
		$("#lyric").text("");
		$("#playLink").attr("src","").hide();
		$("#playData").text("");
	}
	this.nowListId = typeId;
};
musicP.changeNowPlay = function(playNo)
{
	if(this.nowPlayNo != playNo)
	{
		this.nowPlayNo = playNo;
		$("#lyric").text(musicP.playList[this.nowListId][playNo].lyric);
		$("#playLink").attr("src",musicP.playList[this.nowListId][playNo].stream_url).show();
		$("#playData").text(musicP.playList[this.nowListId][playNo].song_name+" - "+musicP.playList[this.nowListId][playNo].groupname);
		}
};

musicP.getTypeListJson();
