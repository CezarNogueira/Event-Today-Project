import { useNavigate } from 'react-router-dom';

export default function Button({ to, className, children }) { 
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(to)} className={className}>
            {children}
        </button>
    );
}