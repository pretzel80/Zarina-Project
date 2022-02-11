import React from 'react';
// import Button from '@mui/material';
import './Description.scss';

export default function Description() {
  return (
    <div className="descBlock">
      <div className="block phone">
        <p>У вас виникли питання стосовно роботи інтернет-магазину?</p>
        <p> Телефонуйте нам:</p>
        <p>
          <a className="numberPhone" href="tel:0900200011">
            0-800-20-00-11 (безкоштовно по Україні),
          </a>
        </p>
        <p>
          <a className="numberPhone" href="tel:+380731190011">
            +38 073 11 900 11
          </a>
        </p>
      </div>
      <div className="block schedule">
        <p>
          <strong>Розклад роботи інтернет-магазину:</strong>
        </p>
        <p> Пн-Пт 9:00 - 19:00</p>
        <p> Сб 10:00 - 18:00</p>
        <p> Нд 10:00 - 18:00</p>
      </div>
      <div className="block marketing">
        <p>
          З питань, пов'язаних з рекламою, маркетингом, PR, звертайтеся на
          електронну пошту
        </p>
        <p>
          <b>
            <a className="mail" href="mailto:marketing@zarina.ua">
              marketing@zarina.ua
            </a>
          </b>
        </p>
      </div>
      <div className="block franchasyng">
        <p>
          З питань розвитку франчайзингу звертайтеся до керівника департаменту
          франчайзингу Марії Малецької
        </p>
        <p>
          <b>
            <a className="mail" href="mailto:mariia.maletska@zarina.ua">
              mariia.maletska@zarina.ua
            </a>
          </b>{' '}
        </p>
      </div>
      <div className="block thank">
        <p>Дякуємо, що Ви з нами!</p>
      </div>
    </div>
  );
}
