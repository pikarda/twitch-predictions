import { css } from '@emotion/css';
import { injectGlobal } from '@emotion/css';

export const ingectGlobalStyle = () => {
	injectGlobal`
	body {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
		min-width: 500px;
	  background-color: #4c3253;
	}

  body > div > div> h2 {
    font-family: Shantell-Sans-Bold;
    font-size: 30px;
    padding-top: 30px;
  }
  
  body > div > div> h3 {
    font-family: Shantell-Sans-Bold;
    font-size: 25px;
    text-decoration: underline;
    margin-bottom: 15px;
  }

  body > div > div:nth-of-type(1) {
    display: block;
	  height: 100%;
	  width: 100%;
	  padding-bottom: 50px;
	  background-color: rgba(209, 196, 196, 0.774);
	  border-radius: 50px;
  }

  body > div > div> a:nth-of-type(1) {
    display: inline-block;
	  appearance: button;
	  text-decoration: none;
	  outline: 0;
	  border: none;
	  cursor: pointer;
	  line-height: 35px;
	  text-align: center;
	  font-weight: 600;
	  border-radius: 4px;
	  font-size: 13px;
	  height: 35px;
	  background-color: #9147ff;
	  color: white;
	  padding: 0 20px;
	  margin-bottom: 20px;
	    :hover {
		  background-color: #772ce8;
	    }
  }

	body > div > div>p {
		font-family: Shantell-Sans;
		font-size: 22px;
    margin: 10px;
	}

  body > div > div> p >span {
    font-family: Shantell-Sans-Bold;
  }
	`;
};
