const MoveList = ({ history }: { history: unknown }) => {
    console.log(history);
    return (
        <div className="w-full h-fit">
            <div className="grid grid-cols-2 gap-y-2 w-full h-fit mx-10 mt-10 overflow-y-scroll">
                {history.map((move: unknown, index: number) => {
                    return (
                        <div key={index}>
                            <p>{move.to}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MoveList;
