function StudentCard({ name, dept }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{name}</h3>
      <p>Department: {dept}</p>
    </div>
  );
}

export default StudentCard;
