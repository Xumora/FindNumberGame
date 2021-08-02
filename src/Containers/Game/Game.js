import { faArrowRight, faUndo, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';

const Game = (props) => {
    const [music, setMusic] = useState(false);
    const [time, setTime] = useState(0);
    const [flip, setFlip] = useState(false);
    const [card, setCard] = useState(0);
    const [selectedError, setSelectedError] = useState(-1);
    const [selectedTrue, setSelectedTrue] = useState(-1);
    const [count, setCount] = useState(4);
    const [numbers, setNumbers] = useState(Array(0).fill().map(() => Math.round(Math.random() * 100)));
    const [modal1, setModal1] = useState(true);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);

    let ms = [...numbers].sort(function (a, b) { return a - b })

    useEffect(() => {
        if (time > 0) { setTimeout(() => setTime(time - 1), 1000) }
        else { setFlip(true) };
    }, [time]);

    const { className } = props;

    const choose = (e, i) => {
        if (time == 0) {
            e.target.classList.remove("flip");
            if (e.target.innerText != ms[card]) {
                setSelectedError(i);
                setModal3(!modal3);
            } else {
                setSelectedTrue(i);
                if (card == ms.length - 1) {
                    setModal2(!modal2)
                }
            }
            setCard(card + 1);
        }
    }

    const win = () => {
        setModal2(!modal2);
        setTime(5);
        setFlip(false);
        setCard(0);
        setCount(count + 1);
        setNumbers(Array(count).fill().map(() => Math.round(Math.random() * 100)));
        setSelectedTrue(-1);
        document.getElementById("gameAudio").src("./win.mp3");
        document.getElementById("gameAudio").play();
    }

    const lose = () => {
        setModal3(!modal3);
        setTime(5);
        setFlip(false);
        setCard(0);
        setCount(5);
        setNumbers(Array(4).fill().map(() => Math.round(Math.random() * 100)));
        setSelectedTrue(-1);
        setSelectedError(-1);
    }

    const startModal = () => {
        setModal1(!modal1);
        setTime(5);
        setFlip(false);
        setCount(count + 1);
        setNumbers(Array(count).fill().map(() => Math.round(Math.random() * 100)));
        document.getElementById("gameAudio").play();
    }

    const musicPlay = () => {
        setMusic(!music);
        if (music) {
            document.getElementById("gameAudio").play();
        } else {
            document.getElementById("gameAudio").pause();
        }
    }
    return <div className="container py-5">

        <div>
            <Modal isOpen={modal1} className={`${className} start`} backdrop={"static"}>
                <ModalBody>
                    Sonlarni kichikdan - kattaga qarab tanlang!
                    <br />
                    <button className="btn btn-success" onClick={startModal}>Boshlash</button>
                </ModalBody>
            </Modal>
        </div>

        <div>
            <Modal isOpen={modal2} className={`${className} win`} backdrop={"static"}>
                <ModalBody>
                    Siz Yutdingiz!
                    <br />
                    <button className="btn text-white fs-3" onClick={win}><FontAwesomeIcon icon={faArrowRight} /></button>
                </ModalBody>
            </Modal>
        </div>

        <div>
            <Modal isOpen={modal3} className={`${className} lose`} backdrop={"static"}>
                <ModalBody>
                    Afsuski Yutqazdingiz!
                    <br />
                    <button className="btn text-white fs-3" onClick={lose}><FontAwesomeIcon icon={faUndo} /></button>
                </ModalBody>
            </Modal>
        </div>

        <div className={`clock bg-white mx-auto d-flex 
        align-items-center justify-content-center ${modal1 && "d-none" || ""}`}>
            <h1 style={{ color: "#0A5949" }} className="fw-bold display-5 m-0">{time}</h1>
        </div>

        <div className="row pt-5">
            {
                numbers.map((v, i) => {
                    return <div className="col-6 col-md-3 mt-4" key={i}>
                        <div className={`box ${flip && "flip" || ""}`} onClick={(e) => choose(e, i)}>
                            <div className={`front py-4 text-center ${selectedError == i && "error" || ""} ${selectedTrue == i && "true" || ""}`}>
                                <h1 className="fw-bold display-2">{v}</h1>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>

        <audio src="./game.mp3" id="gameAudio"></audio>
        <button className="btn audio fs-3 text-white" onClick={musicPlay}>
            <FontAwesomeIcon icon={faVolumeUp} />
        </button>
    </div>
};

export default Game;