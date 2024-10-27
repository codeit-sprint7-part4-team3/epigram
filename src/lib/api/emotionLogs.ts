import { apiRequestWithAtuh } from '@/lib/api/apiRequestWithAtuh';

const getEmotionLogsToday = async (userId: Id) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/emotionLogs/today?userId=${userId}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('감정 로그 가져오기 실패1:', error);
  }
};

const postEmotionLogsToday = async (data: UpsertEmotionLogBody) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/emotionLogs/today`,
      method: 'POST',
      data,
    });

    return response;
  } catch (error) {
    console.error('에피그램 생성 실패:', error);
  }
};

const getEmotionLogsMonthly = async (
  year: number,
  month: Month,
  userId: Id
) => {
  try {
    const response = await apiRequestWithAtuh({
      endpoint: `/emotionLogs/monthly?userId=${userId}&year=${year}&month=${month}`,
      method: 'GET',
    });

    return response;
  } catch (error) {
    console.error('감정 로그 가져오기 실패:', error);
  }
};
export { getEmotionLogsToday, postEmotionLogsToday, getEmotionLogsMonthly };
