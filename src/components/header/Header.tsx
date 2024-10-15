import classNames from "classnames"

const container = [
    'px-4',
    'py-4',
    'lg:px-6',
    'lg:max-w-screen-lg',
    'xl:max-w-screen-xl',
    'mx-auto',
    'sticky',
    'top-0'
]

const Header = () => {
    return <div className='header bg-primary'>
                <div className={classNames(container)}>
                    <img src="logo.svg" alt="ATMS logo" width={80} height={80}/>
                </div>
            </div>
}

export { Header }