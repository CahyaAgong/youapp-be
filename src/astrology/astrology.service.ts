/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { format, parse, isWithinInterval, isValid } from 'date-fns';
import { horoscopeYears, zodiacSigns } from 'src/config/constants';

@Injectable()
export class AstrologyService {

  calculateZodiac(birthday: string): string {
    // const birthDate = parse(birthday, 'yyyy-MM-dd', new Date());
    const birthDate = this.parseBirthday(birthday);
    const birthMonthDay = format(birthDate, 'MM-dd');

    let zodiacSign = '';

    for (const sign of zodiacSigns) {
      const start = parse(sign.start, 'MM-dd', new Date());
      const end = parse(sign.end, 'MM-dd', new Date());

      // Check if the birthday falls between the zodiac's start and end date
      if (
        (birthMonthDay >= format(start, 'MM-dd') && birthMonthDay <= format(end, 'MM-dd')) ||
        (sign.name === '♑ Capricorn' && (birthMonthDay <= '01-19' || birthMonthDay >= '12-22'))
      ) {
        zodiacSign = sign.name;
        break;
      }
    }

    return zodiacSign;
  }

  calculateHoroscope(birthday: string): string {
    // const birthDate = parse(birthday, 'yyyy-MM-dd', new Date());
    const birthDate = this.parseBirthday(birthday);

    let horoscope = '';

    for (const hYear of horoscopeYears) {
      const start = parse(hYear.start, 'yyyy-MM-dd', new Date());
      const end = parse(hYear.end, 'yyyy-MM-dd', new Date());

      // Check if the birth year falls between the horoscope's start and end dates
      if (isWithinInterval(birthDate, { start, end })) {
        horoscope = hYear.year;
        break;
      }
    }

    return horoscope;
  }

  parseBirthday(birthday: string): Date {
    let date: Date | null = null;
  
    if (birthday.includes(' ')) {
      const dateParts = birthday.split(' ');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        date = new Date(`${year}-${month}-${day}`);
      }
    } else if (birthday.includes('-')) {
      const dateParts = birthday.split('-');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        date = new Date(`${year}-${month}-${day}`);
      }
    } else if (birthday.includes('/')) {
      const dateParts = birthday.split('/');
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        date = new Date(`${year}-${month}-${day}`);
      }
    }
  
    // Validasi tanggal
    if (!date || !isValid(date)) {
      throw new Error('Invalid date format. Please provide a valid date.');
    }
  
    return date;
  }
}
