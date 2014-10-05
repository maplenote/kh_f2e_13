
var initTypeListBox = function () {
		if(musicP.typeList.length>0)
		{
			$(".typeListBox").kendoMobileListView({
	      dataSource: new kendo.data.DataSource({
				    data: musicP.typeList
				}),
        template: $("#navListTemplate").html()
    	});
		}
		else
		{
			//TODO retry
			console.log("error:musicP.typeList.length=0");
			//musicP.getTypeListJson(initTypeListBox);
		}
}


var initPlayList = function(e)
{
	//console.log(e.view);
	if(e.view.params.id!==undefined)
	{
		listId = e.view.params.id;
		
	}
	else if(musicP.nowListId!='')
	{
		listId = musicP.nowListId;
	}
	else
	{
		//TODO error
		console.log("error:e.view.params.id=undefined");
	}
	if(musicP.playList[listId]===undefined)
	{
		//TODO retry
		console.log("error:musicP.playList[listId]=undefined");
		//musicP.getPlayListJson(listId,initPlayList);
	}
	else
	{
		$("#playList").kendoMobileListView({
      dataSource: new kendo.data.DataSource({
			    data: musicP.playList[listId]
			}),
    	template: $("#playListTemplate").html()
		});
		musicP.changeNowList(listId);
	}
	
}

var showPlay = function(e){
	if(e.view.params.no!==undefined)
	{
		playNo = e.view.params.no;
	}
	else if(musicP.nowListId!='')
	{
		if(musicP.nowPlayNo!='')
		{
			playNo = musicP.nowPlayNo;
		}
		else
		{
			playNo = 0;
		}
	}
	else
	{
		//TODO error
		console.log("error:e.view.params.no=undefined");
	}
	if(musicP.playList[listId][playNo]===undefined)
	{
		//TODO retry
		console.log("error:musicP.playList[listId][playNo]=undefined");
		//musicP.getPlayListJson(listId,initPlayList);
		return;
	}
	else
	{
		musicP.changeNowPlay(playNo);
	}
	
};