import React, {FC} from 'react';
import Image from "next/image";
import Modal from "@/components/ui/ModalFrameWrapper/Modal";
import styles from './FrameModal.module.scss'

interface IProps {
    active: boolean
    setModal: (value: boolean) => void
    setFrame: (value: number) => void
}

const FrameModal:FC<IProps> = ({active, setModal, setFrame}) => {
    const handleChangeFrame = (number: number) => {
        setModal(false)
        setFrame(number)
    }
    return (
        <Modal active={active} setActive={(value: boolean) => setModal(value)}>
              <div className={styles.frame_wrapper}>
                <h4>Выберите рамку</h4>
                <div className={styles.frame_images}>
                    <Image src={`/frame/frame1.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(1)}
                    />
                    <Image src={`/frame/frame2.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(2)}
                    />
                    <Image src={`/frame/frame3.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(3)}
                    />
                    <Image src={`/frame/frame4.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(4)}
                    /><Image src={`/frame/frame5.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(5)}
                    /><Image src={`/frame/frame6.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(6)}
                    />
                    <Image src={`/frame/frame7.apng`}
                           alt={'previous'}
                           width={120}
                           height={120}
                           onClick={() => handleChangeFrame(7)}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default FrameModal;
