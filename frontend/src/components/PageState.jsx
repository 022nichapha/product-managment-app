function PageState({ loading, error }) {
  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-box border border-base-300 bg-base-100 shadow-sm">
        <span className="loading loading-spinner text-info" />
        <span className="sr-only">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>เกิดข้อผิดพลาด : {error}</span>
      </div>
    );
  }

  return null;
}

export default PageState;
