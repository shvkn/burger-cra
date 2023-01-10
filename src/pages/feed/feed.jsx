import React from 'react';
import styles from './feed.module.css';

function FeedPage() {
  return (
    <div className={`mt-10 ${styles.layout}`}>
      <p className={`text text_type_main-medium ${styles.title}`}>Лента заказов</p>
      <div className={`mt-5 ${styles.orders}`}>Lorem ipsum dolor sit amet.</div>
      <div className={`mt-5 ml-15 ${styles.dashboard}`}>Lorem ipsum dolor sit amet.</div>
    </div>
  );
}

export default FeedPage;
