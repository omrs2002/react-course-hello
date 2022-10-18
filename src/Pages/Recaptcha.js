import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { baseUrl } from '../shared';

export default function Recaptcha() {
    const [captchaUserInput, SetCaptchaUserInput] = useState();
    const [captcha, SetCaptcha] = useState();
    const [refresh, SetRefresh] = useState(false);
    const [result, setResult] = useState('');

    useEffect(() => {
        let url = baseUrl +'Captcha/get-captcha';
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    console.log('we got error !');
                }
                if (response.status === 200) return response.json();
            })
            .then((data) => {
                SetCaptcha(data);
                console.log(data);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [refresh]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = baseUrl +`Captcha/validate-captcha?userInputCaptcha=${captchaUserInput}&captchaEncrypted=${captcha.encryptedCaptchaCode}`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    console.log('we got error !');
                }
                if (response.status === 200) return response.json();
            })
            .then((data) => {
                //console.log(data);
                if (data) 
                {
                    console.log('Valid✅');
                    setResult('true');
                }
                else 
                    {
                        console.log('In Valid 🍺');
                        setResult('false');
                    }

                SetRefresh(!refresh);
            })
            .catch((e) => {
                console.log(e.message);
            });
        //console.log('form submitted ✅');
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            {captcha ? (
                <>
                    <div>
                        <img
                            src={
                                'data:image/png;base64, ' +
                                captcha.captchBase64Data
                            }
                            alt="qr"
                        />
                    </div>
                    <br />
                    <div>
                        <p>Enter Captcha Text:</p>
                    </div>

                    <div>
                        <input
                            className="px-2 rounded py-1 shrink-mw-0"
                            type="text"
                            id="txtword"
                            onChange={(e) => {
                                SetCaptchaUserInput(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        &nbsp;&nbsp;
                        <Button type="submit" variant="primary">
                            Validate Captcha
                        </Button>
                        &nbsp;&nbsp;
                        <span>Result:{result}</span>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </form>
    );
}
