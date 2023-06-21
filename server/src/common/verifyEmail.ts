export default (
    url: string
) => `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <a href="" style="font-size: 1.4em; color: #41917be6; text-decoration: none; font-weight: 600">Welcome to New Haven</a>
    </div>
    <p style="font-size: 1.1em">Hi,</p>
    <p>
      You made a verify email request.please Use the Link below to authenticate your new account.
    </p>
    <a
      href="${url}"
      style="
        background: #41917be6;
        display: block;
        margin: 0 auto;
        width: max-content;
        padding: 10px;
        font-size: 1rem;
        text-decoration: none;
        color: #fff;
        border-radius: 4px;
      "
    >
      Verify Email
    </a>
    <br/>
    <p style="font-size:10px;">You can Instead copy the following link on your browser <br/> ${url}</p>
    <p style="font-size: 0.9em">Regards,<br />New Haven Team</p>
    <hr style="border: none; border-top: 1px solid #eee" />
    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300">
      <p>New Haven: At Your Doorstep</p>
      <p>newhaven@gmail.com</p>
      <p>Lagos, Nigeria</p>
    </div>
  </div>
</div>
`;
