import React, { useEffect, useState } from 'react';
import iconList from '../../images/icon-list.svg';
import successImg from '../../images/icon-success.svg';
import imageDesktop from '../../images/illustration-sign-up-desktop.svg';
import imageMobile from '../../images/illustration-sign-up-mobile.svg';
import style from './Form.module.css';

const FormPage = () => {
    const [flag, setFlag] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [error, setError] = useState('');
    const regex = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const flagHandler = (event) => {
        event.preventDefault();
        if (regex.test(emailValue)) {
            setError('');
            setFlag(!flag);
        } else {
            setError('Valid email required');
        }
    };

    return (
        <div className={style.container}>
            {!flag 
                ? (
                    <form className={style.cardContainer} onSubmit={flagHandler}>
                        <div className={style.infoContainer}>
                            <h1>Stay updated!</h1>

                            <p>Join 60,000+ product managers receiving monthly updates on:</p>
                                <div className={style.list}>
                            <p>
                                <img src={iconList} alt="iconList" />
                                Product discovery and building what matters
                            </p>
                            <p>
                                <img src={iconList} alt="iconList" />
                                Measuring to ensure updates are a success
                            </p>
                            <p>
                                <img src={iconList} alt="iconList" />
                                And much more!
                            </p>
                            </div>

                            <div className={style.email}>
                                <label htmlFor="email">Email address</label>
                                {error && <label htmlFor="email" className={style.errorLabel}>{error}</label>}
                                <input
                                    onChange={(event) => setEmailValue(event.target.value)}
                                    value={emailValue}
                                    type="text"
                                    name="email"
                                    className={error && style.errorInput}
                                    id="email"
                                    placeholder="email@company.com"
                                />
                            </div>

                            <button type="submit">Subscribe to monthly newsletter</button>
                        </div>
                        <img src={isMobile ? imageMobile : imageDesktop} alt="imageForm" />
                    </form>
                ) : (
                    <div className={style.messageContainer}>
                        <img src={successImg} alt="success icon" />
                        <h1>Thanks for subscribing!</h1>
                        <p>
                            A confirmation email has been sent to <label>{emailValue}</label>.
                            Please open it and click the button inside to confirm your subscription.
                        </p>
                        <button type="submit" onClick={flagHandler}>Dismiss message</button>
                    </div>
                )
            }

            <div className={style.attribution}>
                <label>
                    Challenge by <a href="https://www.frontendmentor.io?ref=challenge" rel="noreferrer" target="_blank">Frontend Mentor</a>,
                </label>
                <label>
                    Coded by <a href="https://github.com/SMiguelA" rel="noreferrer" target="_blank">Miguel Sierra</a>.
                </label>
            </div>
        </div>
    );
};

export default FormPage;
