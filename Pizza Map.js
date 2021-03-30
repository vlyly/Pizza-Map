var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new daum.maps.LatLng(37.5118239121138, 127.059159043842), // 지도의 중심좌표
    level: 5, // 지도의 확대 레벨
  };

//지도를 미리 생성
var map = new daum.maps.Map(mapContainer, mapOption);
//주소-좌표 변환 객체를 생성
var geocoder = new daum.maps.services.Geocoder();
//마커를 미리 생성
var marker = new daum.maps.Marker({
  position: new daum.maps.LatLng(37.5118239121138, 127.059159043842),
  map: map,
});
const select_store = document.getElementById("select_store");
const pizzaData = {
  봉천점: "서울 관악구 관악로29길 2",
  신림점: "서울 관악구 신림로58길 38",
  구갈점: "경기 용인시 기흥구 갈곡로 6",
  수지점: "경기 용인시 수지구 풍덕천로197번길 3-9",
  처인구점: "경기 용인시 처인구 경안천로42번길 7",
};

function findStore() {
  var geocoder = new kakao.maps.services.Geocoder();
  let store_address = pizzaData[select_store.value];

  if (store_address === undefined) {
    return false;
  }

  geocoder.addressSearch(store_address, function (results) {
    var result = results[0]; //첫번째 결과의 값을 활용

    // 해당 주소에 대한 좌표를 받아서
    var coords = new daum.maps.LatLng(result.y, result.x);
    // 지도를 보여준다.
    mapContainer.style.display = "block";
    map.relayout();
    // 지도 중심을 변경한다.
    map.setCenter(coords);
    // 마커를 결과값으로 받은 위치로 옮긴다.
    marker.setPosition(coords);
  });
}
select_store.addEventListener("change", findStore);
