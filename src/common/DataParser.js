const DataParser = {
    parsePSOutbound: (data) => {
        let outData = []
        console.log(data)
        if (data && data.timestamp && data.timestamp.length) {
            outData = data.timestamp.map((i, index) => {
                let time = new Date(i * 1000);
                return {
                    price: data.price[index],
                    time: new Date(2021, 1, 1, time.getHours() - 7, time.getMinutes(), time.getSeconds()),
                }

            }) ;
        }
        console.log(outData)
        return outData;
    },

    parseBusdOutbound: (data) => {
        let outData = []
        if (data && data.time && data.time.length) {
            outData = data.time.map((i, index) => {
                let iTimeSplit = i.split(":")
                return {
                    SD: data.SD[index],
                    BU: data.BU[index],
                    NetBUSD: data.Net[index],
                    SMA: data.new_net[index],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                }

            }) ;
        }
        return outData;
    },
    parseVN30Index: (data) => {
        let outData = []
        if (data && data.timestamp && data.timestamp.length) {
            outData = data.timestamp.map((i, index) => {
                let time = new Date(i * 1000);
                return {
                    last: data.last[index],
                    time: new Date(2021, 1, 1, time.getHours() - 7, time.getMinutes(), time.getSeconds()),
                }

            }) ;
        }
        return outData;
    },
    parseBuySellNNOutbound: (data) =>{
        let outData = []
        if (data && data.time.length) {
            outData = data.time.map((i, index) => {

                let iTimeSplit = i.split(":")
                return {
                    price: data.netNN[index],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                    buyPressure: data.buyPressure[index],
                    sellPressure: data.sellPressure[index]
                }
            }) ;
        }
        return outData;
    },

    parseSuuF1Outbound: (data) =>{
        let outData = []
        if (data && data.time && data.time.length) {
            outData = data.time.map((i, index) => {
                let iTimeSplit = i.split(":")
                return {
                    price: data.last[index],
                    foreignerBuyVolume: data.foreignerBuyVolume[index],
                    foreignerSellVolume: data.foreignerSellVolume[index],
                    BidV: data.SMA_BidV[index],
                    AskV: data.SMA_AskV[index],
                    NetBA: data.Net_BA[index],
                    NetBS: data['Net_BU&SD2'][index],
                    SMA: data.SMA[index],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                }

            }) ;
        }
        return outData;
    },

    parseArbitUnwind: (data) => {
        let outData = []
        if (data && data.unwind && data.unwind.time && data.arbit.time.length) {
            outData = data.unwind.time.map((i, index) => {

                let iTimeSplit = i.split(":")
                return {
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                    radius: data.unwind.radius[index],
                    label: data.unwind.label[index],
                    x: data.unwind.x[index],
                    y: data.unwind.y[index],
                    num_lots: data.unwind.num_lots[index]
                }

                //return {time: new Date(timeStamp/1000000 - 7*60*60*1000), price: BuySellNNOutbound.buySell.netNN[index]}
            }) ;
        }
        return outData;
    },

    parseArbit:(data) => {
        let outData = []
        if (data && data.arbit && data.arbit.time && data.arbit.time.length) {
            outData = data.arbit.time.map((i, index) => {

                let iTimeSplit = i.split(":")
                return {
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                    radius: data.arbit.radius[index],
                    label: data.arbit.label[index],
                    x: data.arbit.x[index],
                    y: data.arbit.y[index],
                    num_lots: data.arbit.num_lots[index]
                }

            }) ;
        }
        return outData;
    },

}
export default DataParser;