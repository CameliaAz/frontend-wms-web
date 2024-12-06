export default function Unauthorized() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
            <p>You do not have permission to access this page.</p>
        </div>
    );
}