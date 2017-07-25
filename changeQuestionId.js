var json;
var data;
$('#card').hide();
function handleFileSelect(evt) {
  var files = evt.target.files;
}
function handleFileSelect(evt) {
  var files = evt.target.files;
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        console.log('e readAsText = ', e);
        console.log('e readAsText target = ', e.target);
        try {
          json = JSON.parse(e.target.result);
          var arrayJson = json;
          var i = 0;
          var tam = arrayJson.navigationList.length;
          arrayJson.itemContainer.forEach(function() {
            if (i<tam) {
              json.itemContainer[i].templateID = json.itemContainer[i].customID;
              i++;
            }
          })
          i =0;
          var tamanho = arrayJson.navigationList.length;
          var index = arrayJson.navigationList.length-1;
          for(var i = 0;i<=tamanho;i++){
            if(i<tamanho-1){
              try {
                switch (i) {
                  case 0:
                    json.navigationList[i].routes[0].destination = json.itemContainer[i].templateID;
                    json.navigationList[i].routes[0].name = 'BEGIN NODE_' + json.itemContainer[i].templateID;
                    break;
                  case 1:
                      json.navigationList[i].inNavigations[0].origin = json.itemContainer[index-2].templateID;
                    break;
                  case 2:
                      json.navigationList[i].origin = json.itemContainer[i-2].templateID;
                      json.navigationList[i].inNavigations[0].origin = 'BEGIN NODE';
                      json.navigationList[i].routes[0].destination = json.itemContainer[i-1].templateID;
                      json.navigationList[i].routes[0].name = json.itemContainer[i-2].templateID + "_" + json.itemContainer[i-1].templateID;
                      json.navigationList[i].routes[0].origin = json.itemContainer[i-2].templateID;
                    break;
                  default:
                    json.navigationList[i].origin = json.itemContainer[i-2].templateID;
                    json.navigationList[i].inNavigations[0].origin = json.itemContainer[i-3].templateID;
                    json.navigationList[i].routes[0].origin = json.itemContainer[i-2].templateID;
                    json.navigationList[i].routes[0].destination = json.itemContainer[i-1].customID;
                    json.navigationList[i].routes[0].name = json.itemContainer[i-2].templateID + "_" + json.itemContainer[i-1].templateID;
                }

              } catch (e) {
                console.log(i+ " - "+e);
              }

            }else
              if(i==tamanho-1){
              try {
                json.navigationList[i].origin = json.itemContainer[i-2].templateID;
                json.navigationList[i].inNavigations[0].origin = json.itemContainer[i-3].templateID;
                json.navigationList[i].routes[0].origin = json.itemContainer[i-2].templateID;
                json.navigationList[i].routes[0].destination = 'END NODE';
                json.navigationList[i].routes[0].name = json.itemContainer[i-2].templateID + "_END NODE";
              } catch (e) {
                console.log(i+ " - "+e);
              }

            }
          }
          data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
          $('#card').show();
          $('<a href="data:' + data + '" download="surveyTemplate.json" style="text-decoration:none;color:#000;">Download</a>').appendTo('#container');

        } catch (ex) {
          alert('ex when trying to parse json = ' + ex);
        }
      }
    })(f);
    reader.readAsText(f);
  }

}
