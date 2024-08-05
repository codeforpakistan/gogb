
import moment from 'moment';

const dbDate = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment().format(format);
};
 

const dateDisplay = (date) => {
    return moment(date).format('D MMMM YYYY');
  };

export {dateDisplay, dbDate};

