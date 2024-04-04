//시간 0 자리 추가
export const fillZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};
