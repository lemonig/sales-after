import React, { useState, useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import {
  Card,
  Toast,
  Button,
  NavBar,
  Space,
  Modal,
  List,
  Switch,
} from "antd-mobile";
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import "./index.less";
import locationPng from "../../assets/img/location.png";
import { connect } from "react-redux";
import store from "../../store";
import { mapAction } from "../../store/actions/map-action";

let aMap = {}; //地图实例
let mapIcon = null;

function Map({ handleMapBack, handkeSeleteAddr, lnglat }) {
  let navigate = useNavigate();
  const [poi, setPoi] = useState([]); //地图poi 信息
  const [mapMove, setmapMove] = useState(false); //地图是否移动
  const [centerPixel, setCenterPixel] = useState({
    //中心点坐标
    y: "-999",
    x: "-999",
  });
  const [address, setAddress] = useState({}); //街道

  useEffect(() => {
    AMapLoader.load({
      key: "d5c1d29773f963c999710cb1aa5913cb", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [""], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        aMap = new AMap.Map("map", {
          //设置地图容器id
          // viewMode: "3D", //是否为3D地图模式
          zoom: 16, //初始化地图级别
          touchZoomCenter: 1, // 为1时缩放以地图中心
          resizeEnable: true, // 监控地图容器尺寸变化
          doubleClickZoom: true, // 双击放大地图
          // center: [120.002725, 37.076636], //初始化地图中心点位置
        });
        mapIcon = new AMap.Icon({
          image: locationPng,
          size: new AMap.Size(26, 44),
        });
        aMap.plugin(
          [
            "AMap.ToolBar",
            "AMap.Scale",
            "AMap.HawkEye",
            "AMap.MapType",
            // "AMap.Geocoder",
            // "AMap.Geolocation",
          ],
          function () {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            // aMap.addControl(new AMap.ToolBar());

            // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
            aMap.addControl(new AMap.Scale());
            //地理编码与逆地理编码

            // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
            // aMap.addControl(new AMap.HawkEye({ isOpen: true }));

            // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
            // aMap.addControl(new AMap.MapType());

            // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
            // aMap.addControl(new AMap.Geolocation());
          }
        );
        // 获取中心点
        const getLocation = () => {
          aMap.plugin("AMap.Geolocation", function () {
            aMap.clearMap();
            var geolocation = new AMap.Geolocation({
              enableHighAccuracy: false, //是否使用高精度定位，默认:true
              noIpLocate: 0, //0:可以使用IP定位
              showButton: true, //显示定位按钮，默认：true
              maximumAge: 0, //定位结果缓存0毫秒，默认：0
              timeout: 10000, //超过10秒后停止定位，默认：5s
              position: "RB", //定位按钮的停靠位置
              showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
              showMarker: false, //定位成功时是否在定位位置显示一个Marker
              markerOptions: {
                icon: mapIcon,
                // offset:,
                animation: "AMAP_ANIMATION_BOUNCE",
                anchor: "bottom-center", //设置点标记锚点。
              },
              offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
              zoomToAccuracy: false, //定位成功后是否自动调整地图视野到定位点, bug:开启后只能调整到center
              extensions: "all", //用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。
              panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
            });
            aMap.setZoom(16); // 缩放比例改变后重新定位时设置初始缩放比例
            aMap.addControl(geolocation);
            geolocation.getCurrentPosition(function (status, result) {
              // aMap.clearMap();
              if (status == "complete") {
                onComplete(result);
              } else {
                onError(result);
              }
            });
          });
        };

        //解析定位结果
        function onComplete(data) {
          // console.log(data);
          // console.log(data.position);
          // document.getElementById("status").innerHTML = "定位成功";
          // var str = [];
          // str.push("定位结果：" + data.position);
          // str.push("定位类别：" + data.location_type);
          let position = new AMap.LngLat(data.position.lng, data.position.lat);
          // let currentMarker = new AMap.Marker({
          //   icon: mapIcon,
          //   position: position,
          //   animation: "AMAP_ANIMATION_BOUNCE",
          //   anchor: "bottom-center",
          // });
          // aMap.add(currentMarker);
          // aMap.setCenter([data.position.lng, data.position.lat]); //设置地图中心点
          if (data.accuracy) {
            // str.push("精度：" + data.accuracy + " 米");
          } //如为IP精确定位结果则没有精度信息
          // str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
          // document.getElementById("result").innerHTML = str.join("<br>");
        }
        //解析定位错误信息
        function onError(data) {
          console.log(data);
          // document.getElementById("status").innerHTML = "定位失败";
          // document.getElementById("result").innerHTML =
          //   "失败原因排查信息:" +
          //   data.message +
          //   "</br>浏览器返回信息：" +
          //   data.originMessage;
        }
        // 地图移动
        const mapMoveFun = () => {
          // * 地图移动中
          aMap.on("mapmove", () => {
            setmapMove(false);
          });
          // * 地图移动结束
          aMap.on("moveend", () => {
            setmapMove(true);
            getCenterPoi(); // 获取地址
          });
          aMap.on("zoomend", () => {
            getCenterPoi(); // 获取地址-
          });
        };

        // 获取中心点poi信息
        const getCenterPoi = () => {
          let lnglat = aMap.getCenter();
          var geocoder;
          aMap.plugin("AMap.Geocoder", function () {
            geocoder = new AMap.Geocoder({
              // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
              // city: '010'
              //radius//以给定坐标为中心点，单位：米 取值范围：0-3000
              batch: false, //是否批量查询
              extensions: "all", //all，返回地址信息及附近poi、道路、道路交叉口等信息base，返回基本地址信息；
            });
            // console.log("center", lnglat);
            geocoder.getAddress([lnglat], (status, result) => {
              console.log(result);
              if (status === "complete" && result.info === "OK") {
                setPoi(result.regeocodes[0].pois);
                setAddress(result.regeocodes[0].addressComponent);
              } else {
                Toast.show({
                  content: "地图出了点问题，请稍后再试",
                  afterClose: () => {
                    // console.log("after");
                  },
                });
              }
            });
            // aMap.on("click", (e) => {
            //   console.log(e);
            //   mapClaer();
            //   let marker = new AMap.Marker({
            //     icon: mapIcon,
            //     position: e.lnglat,
            //     anchor: "bottom-center",
            //   });
            //   aMap.add(marker);
            //   aMap.setCenter(e.lnglat); //设置地图中心点
            //   geocoder.getAddress(
            //     [e.lnglat.lng, e.lnglat.lat],
            //     (status, result) => {
            //       if (status === "complete" && result.info === "OK") {
            //         console.log(result);
            //         setPoi(result.regeocode.pois);
            //       }
            //     }
            //   );
            // });
          });
        };

        // 扎点中心坐标
        function setCenterIcon() {
          let lnglat = aMap.getCenter();
          let pixel = aMap.lngLatToContainer(lnglat);
          console.log(pixel);
          setCenterPixel(pixel);
          getCenterPoi(); // 获取地址
        }
        getLocation();
        setCenterIcon();
        mapMoveFun();
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const back = () => {
    handleMapBack();
    // navigate(-1, { replace: true });
  };
  const handleSelectAdress = (poi) => {
    let lnglat = aMap.getCenter();
    handkeSeleteAddr({
      address,
      poi,
      lnglat,
    });
    store.dispatch(
      mapAction.selectAddress({
        address,
        poi,
        lnglat,
      })
    );
  };
  return (
    <div className="map-wrap">
      <NavBar back="返回" onBack={back}>
        定位地址
      </NavBar>

      <div id="map_container">
        <div id="map"></div>
        <div
          id="center_icon"
          style={{
            left: centerPixel.x + "px",
            top: `${centerPixel.y}px`,
          }}
        >
          <img
            src={locationPng}
            alt="loc"
            className={mapMove ? "pinAnima" : ""}
          />
        </div>
      </div>
      <div className="poi-wrap">
        <List className="list">
          {poi.map((item) => (
            <List.Item
              arrow={false}
              prefix={<i className="gray-circle-icon" />}
              onClick={() => handleSelectAdress(item)}
              key={item.id}
              description={item.address}
            >
              {item.name}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Map);
