import moment from "moment";

// Function to generate 100 data points
export function generateSuuF1OutboundMockData(length = 100) {
  const data = {
    time: [],
    last: [],
    foreignerBuyVolume: [],
    foreignerSellVolume: [],
    SMA_BidV: [],
    SMA_AskV: [],
    Net_BA: [],
    "Net_BU&SD2": [],
    SMA: [],
  };

  // Set a starting time of 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    // Generate time string by adding i minutes to the starting time
    data.time.push(startTime.clone().add(i, "minutes").format("HH:mm:ss"));

    // Populate the other arrays with some sample/random data
    data.last.push(Number((100 + Math.random() * 10).toFixed(2))); // price between 100 and 110
    data.foreignerBuyVolume.push(Math.floor(Math.random() * 200 + 100)); // random volume between 100 and 300
    data.foreignerSellVolume.push(Math.floor(Math.random() * 200 + 100));
    data.SMA_BidV.push(Math.floor(Math.random() * 500 + 500)); // between 500 and 1000
    data.SMA_AskV.push(Math.floor(Math.random() * 500 + 500));
    data.Net_BA.push(Math.floor(Math.random() * 50 + 10)); // arbitrary range
    data["Net_BU&SD2"].push(Math.floor(Math.random() * 50 + 10));
    data.SMA.push(Number((100 + Math.random() * 10).toFixed(2)));
  }

  return data;
}

export function generatePSMockData(length = 100) {
  const data = {
    time: [],
    price: [],
  };

  // Set a starting time of 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    // Each entry is one minute apart
    data.time.push(startTime.clone().add(i, "minutes").format("HH:mm:ss"));

    // Generate a random price between 50 and 60
    data.price.push(Number((50 + Math.random() * 10).toFixed(2)));
  }

  return data;
}

export function generateBusdMockData(length = 100) {
  const data = {
    time: [],
    SD: [],
    BU: [],
    Net: [],
    new_net: [],
  };

  // Set a starting time of 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    // Generate a time string, one minute apart
    data.time.push(startTime.clone().add(i, "minutes").format("HH:mm:ss"));

    // Populate each field with some sample/random data
    data.SD.push(Math.floor(Math.random() * 100)); // Random integer between 0 and 99
    data.BU.push(Math.floor(Math.random() * 100)); // Random integer between 0 and 99
    data.Net.push(Number((Math.random() * 10).toFixed(2))); // Random value between 0 and 10 (2 decimals)
    data.new_net.push(Number((Math.random() * 10).toFixed(2))); // Random value between 0 and 10 (2 decimals)
  }

  return data;
}

export function generateVN30IndexMockData(length = 100) {
  const data = {
    time: [],
    last: [],
  };

  // Start at 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    // Generate a time string, one minute apart
    data.time.push(startTime.clone().add(i, "minutes").format("HH:mm:ss"));

    // Generate a random price for VN30 index, for example between 1000 and 1200
    data.last.push(Number((1000 + Math.random() * 200).toFixed(2)));
  }

  return data;
}

export function generateBuySellNNMockData(length = 100) {
  const data = {
    time: [],
    netNN: [],
    buyPressure: [],
    sellPressure: [],
  };

  // Set a starting time of 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    // Generate a time string one minute apart
    data.time.push(startTime.clone().add(i, "minutes").format("HH:mm:ss"));

    // Generate a random price for netNN between 100 and 110
    data.netNN.push(Number((100 + Math.random() * 10).toFixed(2)));

    // Generate random buyPressure and sellPressure values between 50 and 150
    data.buyPressure.push(Math.floor(Math.random() * 100 + 50));
    data.sellPressure.push(Math.floor(Math.random() * 100 + 50));
  }

  return data;
}

export function generateArbitUnwindMockData(length = 100) {
  const data = {
    unwind: {
      time: [],
      radius: [],
      label: [],
      x: [],
      y: [],
      num_lots: [],
    },
    arbit: {
      time: [],
      radius: [],
      label: [],
      x: [],
      y: [],
      num_lots: [],
    },
  };

  // Set a starting time of 09:30:00 on the current day
  const startTime = moment().hour(9).minute(30).second(0);

  for (let i = 0; i < length; i++) {
    const timeStr = startTime.clone().add(i, "minutes").format("HH:mm:ss");
    // Populate unwind data arrays
    data.unwind.time.push(timeStr);
    data.unwind.radius.push(Math.floor(Math.random() * 40) + 10); // random integer between 10 and 50
    data.unwind.label.push(`Label ${i + 1}`);
    data.unwind.x.push(Number((Math.random() * 100).toFixed(2))); // random number between 0 and 100
    data.unwind.y.push(Number((Math.random() * 100).toFixed(2))); // random number between 0 and 100
    data.unwind.num_lots.push(Math.floor(Math.random() * 100) + 1); // random integer between 1 and 100

    // Populate arbit time array (ensuring it has the same number of entries)
    data.arbit.time.push(timeStr);
    data.arbit.radius.push(Math.floor(Math.random() * 40) + 10); // random integer between 10 and 50
    data.arbit.label.push(`Label ${i + 1}`);
    data.arbit.x.push(Number((Math.random() * 100).toFixed(2))); // random number between 0 and 100
    data.arbit.y.push(Number((Math.random() * 100).toFixed(2))); // random number between 0 and 100
    data.arbit.num_lots.push(Math.floor(Math.random() * 100) + 1); // random integer between 1 and 100

  }

  return data;
}

export function generateArbitMockData(length = 100) {
    const data = {
      arbit: {
        time: [],
        radius: [],
        label: [],
        x: [],
        y: [],
        num_lots: []
      }
    };
  
    // Start at 09:30:00 on the current day
    const startTime = moment().hour(9).minute(30).second(0);
  
    for (let i = 0; i < length; i++) {
      const timeStr = startTime.clone().add(i, 'minutes').format('HH:mm:ss');
      data.arbit.time.push(timeStr);
  
      // Generate sample values for each field:
      data.arbit.radius.push(Math.floor(Math.random() * 40) + 10);  // Random integer between 10 and 50
      data.arbit.label.push(`Arbit Label ${i + 1}`);
      data.arbit.x.push(Number((Math.random() * 100).toFixed(2)));    // Random number between 0 and 100
      data.arbit.y.push(Number((Math.random() * 100).toFixed(2)));    // Random number between 0 and 100
      data.arbit.num_lots.push(Math.floor(Math.random() * 100) + 1);   // Random integer between 1 and 100
    }
  
    return data;
  }
