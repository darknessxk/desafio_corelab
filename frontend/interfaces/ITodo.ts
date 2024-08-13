export default interface ITodo {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: string;
    title: string;
    completed: boolean;
    favorite: boolean;
    description: string;
    color: string;
    due_date: string;
    completed_at: string;
}