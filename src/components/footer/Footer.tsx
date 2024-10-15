import classNames from "classnames"

const text = [
    'text-white','text-lg','text-center'
]

const Footer = () => {
    return <div className="footer flex justify-center p-4 bg-primary">
        <p className={classNames(text)}>Advanced Tasks Management System Project@2024</p>
    </div>

}

export { Footer }