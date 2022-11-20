export const Login = () => {
    return(
        <form>
                <label for="username">USERNAME</label>
                <input type="text" placeholder="your Sid" id="username" name="username"></input>
                <label for="password">PASSWORD</label>
                <input type="password" placeholder="********"id="password" name="password"></input>
        </form>
    )
}