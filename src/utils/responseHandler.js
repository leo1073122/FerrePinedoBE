// Helper para respuestas consistentes
export const sendResponse = (res, data = null, message = "", success = true, status = 200) => {
    return res.status(status).json({
      success,
      message,
      data
    });
  };
  