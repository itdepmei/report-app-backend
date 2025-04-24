exports.setReportIdToBody = (req, res, next) => {
    if (!req.body.report) req.body.report = req.params.reportId;
    next();
  };