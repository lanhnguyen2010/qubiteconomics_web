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
    let outData = [];
    outData = data.map((i) => {
      return {
        last: i.smoothedLast,
        time: new Date(i.timestamp.seconds * 1000),
      };
    });
    return outData;
  },

  parseFBFS: (data) => {
    const { fbList, fsList } = data;
    let outDataHashMap = new Map();
    fbList.forEach((fbItem) => {
      outDataHashMap.set(fbItem.timestamp.seconds * 1000, { fbVolume: fbItem.volume });
    });
    fsList.forEach((fsItem) => {
      if (outDataHashMap.has(fsItem.timestamp.seconds * 1000)) {
        outDataHashMap.set(fsItem.timestamp.seconds * 1000, { ...outDataHashMap.get(fsItem.timestamp.seconds * 1000), fsVolume: fsItem.volume });
      } else {
        outDataHashMap.set(fsItem.timestamp.seconds * 1000, { fsVolume: fsItem.volume });
      }
    });

    let outData = [];
    let lastestFbVolume = 0;
    let lastestFsVolume = 0;
    outDataHashMap.forEach((value, key) => {
      lastestFbVolume = value.fbVolume || lastestFbVolume;
      lastestFsVolume = value.fsVolume || lastestFsVolume;
      outData.push({
        time: new Date(key),
        fbVolume: lastestFbVolume,
        fsVolume: lastestFsVolume,
        net: lastestFbVolume - lastestFsVolume
      });
    })
    outData.sort((a, b) => a.time - b.time);
    return outData;
  },

  parseForeignPS: (data) => {
    let outData = [];
    outData = data.map((i) => {
      return {
        time: new Date(i.time.seconds * 1000),
        fb: i.fb,
        fs: i.fs,
        net: i.fb - i.fs
      };
    });
    return outData;
  },

  parseBidAskPS: (data) => {
    let outData = [];
    outData = data.map((i) => {
      return {
        time: new Date(i.time.seconds * 1000),
        bid: i.bid,
        ask: i.ask,
      };
    });
    return outData;
  },

  parseBusd: (data) => {
    const { busdList } = data;
    let outData = [];
    busdList.forEach((busdItem) => {
      outData.push({
        time: new Date(busdItem.timestamp.seconds * 1000),
        buyUp: busdItem.buyUp,
        sellDown: busdItem.sellDown,
      })
    })
    return outData;
  },
  parseNetBusd: (data) => {
    const { busdList } = data;
    let outData = [];
    busdList.forEach((busdItem) => {
      outData.push({
        time: new Date(busdItem.time.seconds * 1000),
        net: busdItem.netbusd,
        cumSum: busdItem.netcumsum
      })
    })
    return outData;
  },
  parseBuySellBubble: (data) => {
    const { buyDataList, sellDataList } = data;
    let outData = {
      buyData: [],
      sellData: [],};

    outData.buyData = buyDataList.map((i) => {
      return {
        time: new Date(i.time.seconds * 1000),
        radius: i.radius,
        code: i.code,
        last: i.last,
        matchedVol: i.matchedVol,
      };
    });

    outData.sellData = sellDataList.map((i) => {
      return {
        time: new Date(i.time.seconds * 1000),
        radius: i.radius,
        code: i.code,
        last: i.last,
        matchedVol: i.matchedVol,
      };
    });
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
