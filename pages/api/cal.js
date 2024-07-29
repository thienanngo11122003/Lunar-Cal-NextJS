export default (req, res) => {
    const today = new Date();
    res.status(200).json({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    });
  };
  