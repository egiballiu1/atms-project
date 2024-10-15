export type CardProps = {
    title : string,
    content? : string,
    icon : string,
    status? : 'to-do' | 'in-progress' | 'in-test' | 'blocked' | 'done'
}