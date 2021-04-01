import { Card, Avatar } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import styles from '../styles/files.module.scss';

const { Meta } = Card;

const files = () => {
  const cardArray = [];
  const renderFiles = () => {
    for (let i = 0; i < 5; i++) {
      cardArray.push(
        <Card
          className={styles.card}
          cover={
            <div className={styles.flex}>
              <p className={styles.para}>file type</p>
            </div>
          }
          actions={[
            <DownloadOutlined key="download" />,
            <EyeOutlined key="see" />,
          ]}
        >
          <Meta title="filename" description="owner" />
        </Card>
      );
    }
    return cardArray;
  };

  return (
    <div className={styles.grid}>
      {renderFiles().map((card, i) => (
        <div key={i}> {card}</div>
      ))}
    </div>
  );
};

export default files;
