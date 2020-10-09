export default (data, biz_id) => {
  return {
    biz_id: biz_id,
    bandwidth: data.bandwidth,
    request_status: data.request_status,
    date_begin: data.date_begin,
    date_end: data.date_end,
  };
};
