.searchbar {
    position: relative;
    height: 64px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .form {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .input {
    display: block;
    width: 100%;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    line-height: 28px;
    padding: 10px;
    margin-right: 10px;
  }
  
  .input:focus {
    outline: none;
    box-shadow: 0 0 0 3px #2185d0;
  }
  
  .button {
    border: none;
    border-radius: 3px;
    background-color: #2185d0;
    color: #fff;
    font-size: 18px;
    line-height: 24px;
    padding: 12px 16px;
    cursor: pointer;
  }
  
  .button:hover,
  .button:focus {
    background-color: #0a77c2;
    outline: none;
  }
  
  .button-label {
    display: inline-block;
    margin-left: 4px;
  }
  