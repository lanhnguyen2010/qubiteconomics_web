import moment from "moment-timezone";

const DataParser = {
  parsePSOutbound: (data) => {
    let outData = [];
    outData = data.map((i) => {
      return {
        price: i.smoothedLast,
        time: new Date(i.timestamp.seconds * 1000),
      };
    });
    return outData;
  },

  parseVN30Index: (data) => {
    console.log("data VN30", data);
    let outData = [];
    outData = data.map((i) => {
      return {
        last: i.smoothedLast,
        time: new Date(i.timestamp.seconds * 1000),
      };
    });
    console.log("outData VN30", outData);
    return outData;
  },

  parseFBFS: (data) => {
    const { fbList, fsList } = data;
    let outData = [];
  
    outData = fbList.map((fbItem, index) => {
      const fsItem = fsList[index];
  
      return {
        time: new Date(fbItem.timestamp.seconds * 1000),                
        fbVolume: fbItem.volume,          
        fsVolume: fsItem.volume,          
        net: fbItem.volume - fsItem.volume 
      };
    });
    console.log("outData FBFS", outData);
    return outData;
  },

    // parsePSOutbound: (data, date) => {
    //   date = date || moment();

    //   let outData = [];
    //   if (data && data.time && data.time.length) {
    //     outData = data.time.map((i, index) => {
    //       let iTimeSplit = i.split(":");
    //       return {
    //         price: data.price[index],
    //         time: new Date(
    //           date.year(),
    //           date.month(),
    //           date.date(),
    //           parseInt(iTimeSplit[0]),
    //           parseInt(iTimeSplit[1]),
    //           parseInt(iTimeSplit[2])
    //         ),
    //       };
    //     });
    //   }
    //   console.log("outData PS", outData);
    //   return outData;
    // },
    // parseVN30Index: (data, date) => {
    //   date = date || moment();

    //   let outData = [];
    //   if (data && data.time && data.time.length) {
    //     outData = data.time.map((i, index) => {
    //       let iTimeSplit = i.split(":");
    //       return {
    //         last: data.last[index],
    //         time: new Date(
    //           date.year(),
    //           date.month(),
    //           date.date(),
    //           parseInt(iTimeSplit[0]),
    //           parseInt(iTimeSplit[1]),
    //           parseInt(iTimeSplit[2])
    //         ),
    //       };
    //     });
    //   }
    //   console.log("outData VN30Index", outData);
    //   return outData;
    // },

  parseBusdOutbound: (data, date) => {
    date = date || moment();

    let outData = [];
    if (data && data.time && data.time.length) {
      outData = data.time.map((i, index) => {
        let iTimeSplit = i.split(":");
        return {
          SD: data.SD[index],
          BU: data.BU[index],
          NetBUSD: data.Net[index],
          SMA: data.new_net[index],
          time: new Date(
            date.year(),
            date.month(),
            date.date(),
            parseInt(iTimeSplit[0]),
            parseInt(iTimeSplit[1]),
            parseInt(iTimeSplit[2])
          ),
        };
      });
    }
    return outData;
  },

  parseBuySellNNOutbound: (data, date) => {
    date = date || moment();

    let outData = [];
    if (data && data.time && data.time.length) {
      outData = data.time.map((i, index) => {
        let iTimeSplit = i.split(":");
        return {
          price: data.netNN[index],
          time: new Date(
            date.year(),
            date.month(),
            date.date(),
            parseInt(iTimeSplit[0]),
            parseInt(iTimeSplit[1]),
            parseInt(iTimeSplit[2])
          ),
          buyPressure: data.buyPressure[index],
          sellPressure: data.sellPressure[index],
        };
      });
    }
    return outData;
  },

  parseSuuF1Outbound: (data, date) => {
    date = date || moment();

    let outData = [];
    if (data && data.time && data.time.length) {
      outData = data.time.map((i, index) => {
        let iTimeSplit = i.split(":");
        return {
          price: data.last[index],
          foreignerBuyVolume: data.foreignerBuyVolume[index],
          foreignerSellVolume: data.foreignerSellVolume[index],
          BidV: data.SMA_BidV[index],
          AskV: data.SMA_AskV[index],
          NetBA: data.Net_BA[index],
          NetBS: data["Net_BU&SD2"][index],
          SMA: data.SMA[index],
          time: new Date(
            date.year(),
            date.month(),
            date.date(),
            parseInt(iTimeSplit[0]),
            parseInt(iTimeSplit[1]),
            parseInt(iTimeSplit[2])
          ),
        };
      });
    }
    return outData;
  },

  parseArbitUnwind: (data, date) => {
    date = date || moment();
    let outData = [];
    if (data && data.unwind && data.unwind.time && data.arbit.time.length) {
      outData = data.unwind.time.map((i, index) => {
        let iTimeSplit = i.split(":");
        return {
          time: new Date(
            date.year(),
            date.month(),
            date.date(),
            parseInt(iTimeSplit[0]),
            parseInt(iTimeSplit[1]),
            parseInt(iTimeSplit[2])
          ),
          radius: data.unwind.radius[index],
          label: data.unwind.label[index],
          x: data.unwind.x[index],
          y: data.unwind.y[index],
          num_lots: data.unwind.num_lots[index],
        };
      });
    }
    return outData;
  },

  parseArbit: (data, date) => {
    date = date || moment();
    let outData = [];
    if (data && data.arbit && data.arbit.time && data.arbit.time.length) {
      outData = data.arbit.time.map((i, index) => {
        let iTimeSplit = i.split(":");
        return {
          time: new Date(
            date.year(),
            date.month(),
            date.date(),
            parseInt(iTimeSplit[0]),
            parseInt(iTimeSplit[1]),
            parseInt(iTimeSplit[2])
          ),
          radius: data.arbit.radius[index],
          label: data.arbit.label[index],
          x: data.arbit.x[index],
          y: data.arbit.y[index],
          num_lots: data.arbit.num_lots[index],
        };
      });
    }
    return outData;
  },
};
export default DataParser;
