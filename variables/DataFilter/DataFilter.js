const DataFilter = (data, option) => {
  let filter = true;
  // about action type
  if (option.action !== "--")
    filter =
      filter &&
      (data._type==="0" ? "Upload" : "Download") === option.action;
  if (option.user !== "--") filter = filter && data.user === option.user;
  if (option.filetype !== "--")
    filter = filter && data.filetype === option.filetype;
  if (option.size !== "--") {
    if (option.size.type === "value") {
      if (option.size.value !== "--") {
        filter = filter && parseInt(data.size) === parseInt(option.size.value);
      }
    } else if (option.size.type === "range") {
      filter =
        filter &&
        data.size >= (isNaN(option.size.start) ? 0 : option.size.start);
      filter =
        filter &&
        data.size <= (isNaN(option.size.end) ? Infinity : option.size.end);
    }
  }
  if (option.time !== "--") {
    if (option.time.type === "value") {
      if (option.time.value !== "--") {
        filter = filter && parseInt(data.time)*1000 === parseInt(option.time.value);
      }
    } else if (option.time.type === "range") {
      filter =
        filter &&
        data.time >= (isNaN(option.time.start) ? 0 : option.time.start);
      filter =
        filter &&
        data.time <= (isNaN(option.time.end) ? Infinity : option.time.end);
    }
  }
  return filter;
};
export { DataFilter };
