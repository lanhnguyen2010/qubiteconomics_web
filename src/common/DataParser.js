const DataParser = {
    parsePSOutbound: (data) => {
        let outData = []
        if (data) {
            outData = data.map((i) => {
                return {price: i.price, time: new Date(2021, 1, 1, parseInt(i.hour), parseInt(i.minute), parseInt(i.second))}
            }).reverse()
        }
        return outData;
    },

    parseBusdOutbound: (data) => {
        let outData = []
        if (data) {
            outData = data.BUSD.time.map((i, index) => {
                let iTimeSplit = i.split(":")
                return {
                    SD: data.BUSD.SD[index],
                    BU: data.BUSD.BU[index],
                    NetBUSD: data.BUSD.Net[index],
                    SMA: data.BUSD.SMA[index],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                }

            }).reverse();
        }
        return outData;
    },
    parseBuySellNNOutbound: (data) =>{
        let outData = []
        if (data) {
            outData = data.buySell.time.map((i, index) => {

                let iTimeSplit = i.split(":")
                return {
                    price: data.buySell.netNN[index],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2])),
                    buyPressure: data.buySell.buyPressure[index],
                    sellPressure: data.buySell.sellPressure[index]
                }
            }).reverse();
        }
        return outData;
    },
    parseSuuF1Outbound: (data) =>{
        let outData = []
        if (data) {
            outData = data.map((i) => {

                //TODO timestamp not working
                let iTimeSplit = i.time.split(":")
                return {
                    price: i.last,
                    foreignerBuyVolume: i.foreignerBuyVolume,
                    foreignerSellVolume: i.foreignerSellVolume,
                    BidV: i.totalBidVolume,
                    AskV  : i.totalOfferVolume,
                    NetBA : i.Net_BA,
                    SMA : i.SMA,
                    NetBS : i['Net_BU&SD2'],
                    time: new Date(2021, 1, 1, parseInt(iTimeSplit[0]), parseInt(iTimeSplit[1]), parseInt(iTimeSplit[2]))
                }
            }).reverse();
        }
        return outData;
    },

    parseArbitUnwind: (data) => {
        let outData = []
        if (data) {
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
            }).reverse();
        }
        return outData;
    },

    parseArbit:(data) => {
        let outData = []
        if (data) {
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

            }).reverse();
        }
        return outData;
    },

}
export default DataParser;