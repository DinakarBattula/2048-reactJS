import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';

const App = () => {

    let numberColors = {
        2: { backgroundColor: '#eee4da', color: '#776E65' },
        4: { backgroundColor: '#eee1c9', color: '#776E65' },
        8: { backgroundColor: '#f3b27a', color: '#f9f6f2' },
        16: { backgroundColor: '#f69664', color: '#f9f6f2' },
        32: { backgroundColor: '#f77c5f', color: '#f9f6f2' },
        64: { backgroundColor: '#f75f3b', color: '#f9f6f2' },
        128: { backgroundColor: '#edd073', color: '#f9f6f2' },
        256: { backgroundColor: '#edcc62', color: '#f9f6f2' },
        512: { backgroundColor: '#edc950', color: '#f9f6f2' },
        1024: { backgroundColor: '#edc53f', color: '#f9f6f2' },
        2048: { backgroundColor: '#edd22e', color: '#f9f6f2' },
    };
    let [matrix, setMatrix] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]);
    let dummyMatrix = [[...matrix[0]], [...matrix[1]], [...matrix[2]], [...matrix[3]]];
    const randomNums = [2, 4];
    let emptyFields = [];
    matrix.forEach((rowArray, rowIndex) =>
        rowArray.forEach((value, valueIndex) => {
            if (!value) emptyFields.push(rowIndex + '' + valueIndex);
        })
    );

    let [score, setScore] = useState({ score: 0, scoreAdded: 0 });

    const swipedLeft = () => {
        let changed = false;
        let currentScore = 0;
        dummyMatrix.forEach((rowArray, rowIndex) => {
            let valuesInRow = [];
            let resultRow = [];
            rowArray.forEach((value) => {
                if (value !== 0) valuesInRow.push(value)
            });

            let i = 0;
            let j = 1;
            while (i < valuesInRow.length) {
                if (valuesInRow[i] === valuesInRow[j]) {
                    let scoreAdded = valuesInRow[i] + valuesInRow[j];
                    currentScore += scoreAdded

                    resultRow.push(scoreAdded);
                    i = j + 1;
                    j = i + 1;
                } else {
                    resultRow.push(valuesInRow[i]);
                    i++;
                    j++;
                }
            }

            const emptyFieldsLength = emptyFields.length;
            for (let i = 0; i <= 3; i++) {
                const fieldNum = rowIndex + '' + i;
                const fieldIndex = emptyFields.indexOf(fieldNum);
                if (!resultRow[i]) {
                    if (fieldIndex === -1)
                        emptyFields.push(fieldNum);
                    resultRow.push(0);
                } else {
                    if (fieldIndex !== -1)
                        emptyFields.splice(fieldIndex, 1);
                }
            }
            for (let i = 0; i < 4; i++) {
                if (dummyMatrix[rowIndex][i] !== resultRow[i]) changed = true;
                dummyMatrix[rowIndex][i] = resultRow[i];

            }
        });

        if (emptyFields.length && changed) {
            createRandomNum();
            setScore(prevScore => {
                return {
                    score: prevScore.score + currentScore,
                    scoreAdded: currentScore
                }
            });
        }
    };
    const swipedRight = () => {
        let changed = false;
        let currentScore = 0;
        dummyMatrix.forEach((rowArray, rowIndex) => {
            let valuesInRow = [];
            let resultRow = [];
            rowArray.forEach((value) => {
                if (value !== 0) valuesInRow.push(value)
            });

            let i = valuesInRow.length - 1;
            let j = valuesInRow.length - 2;
            while (i >= 0) {
                if (valuesInRow[i] === valuesInRow[j]) {
                    let scoreAdded = valuesInRow[i] + valuesInRow[j];
                    currentScore += scoreAdded

                    resultRow.unshift(scoreAdded);
                    i = j - 1;
                    j = i - 1;
                } else {
                    resultRow.unshift(valuesInRow[i]);
                    i--;
                    j--;
                }
            }

            const emptyFieldsLength = emptyFields.length;
            for (let i = 0; i <= 3; i++) {
                const fieldNum = rowIndex + '' + (3 - i);
                const fieldIndex = emptyFields.indexOf(fieldNum);
                if (!resultRow[i]) {
                    if (fieldIndex === -1)
                        emptyFields.push(fieldNum);
                    resultRow.unshift(0);
                } else {
                    if (fieldIndex !== -1)
                        emptyFields.splice(fieldIndex, 1);
                }
            }
            for (let i = 0; i < 4; i++) {
                if (dummyMatrix[rowIndex][i] !== resultRow[i]) changed = true;
                dummyMatrix[rowIndex][i] = resultRow[i];

            }
        });

        if (emptyFields.length && changed) {
            createRandomNum();
            setScore(prevScore => {
                return {
                    score: prevScore.score + currentScore,
                    scoreAdded: currentScore
                }
            });
        }
    };
    const swipedUp = () => {
        let changed = false;
        let currentScore = 0;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
            let columnArray = [];
            let valuesInColumn = [];
            let resultColumn = [];

            for (let k = 0; k < 4; k++) {
                columnArray.push(dummyMatrix[k][columnIndex]);
            }

            columnArray.forEach((value) => {
                if (value !== 0) valuesInColumn.push(value)
            });

            let i = 0;
            let j = 1;
            while (i < valuesInColumn.length) {
                if (valuesInColumn[i] === valuesInColumn[j]) {
                    let scoreAdded = valuesInColumn[i] + valuesInColumn[j];
                    currentScore += scoreAdded

                    resultColumn.push(scoreAdded);
                    i = j + 1;
                    j = i + 1;
                } else {
                    resultColumn.push(valuesInColumn[i]);
                    i++;
                    j++;
                }
            }

            const emptyFieldsLength = emptyFields.length;
            for (let i = 0; i <= 3; i++) {
                const fieldNum = i + '' + columnIndex;
                const fieldIndex = emptyFields.indexOf(fieldNum);
                if (!resultColumn[i]) {
                    if (fieldIndex === -1)
                        emptyFields.push(fieldNum);
                    resultColumn.push(0);
                } else {
                    if (fieldIndex !== -1)
                        emptyFields.splice(fieldIndex, 1);
                }
            }

            for (let k = 0; k < 4; k++) {
                if (dummyMatrix[k][columnIndex] !== resultColumn[k]) changed = true;
                dummyMatrix[k][columnIndex] = resultColumn[k];
            }
        };

        if (emptyFields.length && changed) {
            createRandomNum();
            setScore(prevScore => {
                return {
                    score: prevScore.score + currentScore,
                    scoreAdded: currentScore
                }
            });
        }
    };
    const swipedDown = () => {
        let changed = false;
        let currentScore = 0;
        for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
            let columnArray = [];
            let valuesInColumn = [];
            let resultColumn = [];

            for (let k = 0; k < 4; k++) {
                columnArray.push(dummyMatrix[k][columnIndex]);
            }

            columnArray.forEach((value) => {
                if (value !== 0) valuesInColumn.push(value)
            });

            let i = 0;
            let j = 1;
            while (i < valuesInColumn.length) {
                if (valuesInColumn[i] === valuesInColumn[j]) {
                    let scoreAdded = valuesInColumn[i] + valuesInColumn[j];
                    currentScore += scoreAdded;

                    resultColumn.push(scoreAdded);
                    i = j + 1;
                    j = i + 1;
                } else {
                    resultColumn.push(valuesInColumn[i]);
                    i++;
                    j++;
                }
            }

            const emptyFieldsLength = emptyFields.length;
            for (let i = 0; i <= 3; i++) {
                const fieldNum = (3 - i) + '' + columnIndex;
                const fieldIndex = emptyFields.indexOf(fieldNum);
                if (!resultColumn[i]) {
                    if (fieldIndex === -1)
                        emptyFields.push(fieldNum);
                    resultColumn.unshift(0);
                } else {
                    if (fieldIndex !== -1)
                        emptyFields.splice(fieldIndex, 1);
                }
            }

            for (let k = 0; k < 4; k++) {
                if (dummyMatrix[k][columnIndex] !== resultColumn[k]) changed = true;
                dummyMatrix[k][columnIndex] = resultColumn[k];
            }
        };

        if (emptyFields.length && changed) {
            createRandomNum();
            setScore(prevScore => {
                return {
                    score: prevScore.score + currentScore,
                    scoreAdded: currentScore
                }
            });
        }
    };

    const createRandomNum = () => {
        let fieldIndex = -1;
        while (fieldIndex === -1) {
            let randomRow = Math.floor(Math.random() * 4);
            let randomColumn = Math.floor(Math.random() * 4);
            const fieldNum = randomRow + '' + randomColumn;
            fieldIndex = emptyFields.indexOf(fieldNum);
            if (fieldIndex >= 0) {
                console.log(dummyMatrix, emptyFields, fieldNum);
                // emptyFields.splice(fieldIndex, 1);
                dummyMatrix[randomRow][randomColumn] = randomNums[Math.floor(Math.random() + 0.5)];
                setMatrix(dummyMatrix);
            }
        }
    }

    useEffect(() => {
        if (emptyFields.length) {
            createRandomNum();
        }
    }, []);
    useEffect(() => {
        const eventsSwitchFunc = (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    swipedLeft();
                    break;
                case 'ArrowRight':
                    swipedRight();
                    break;
                case 'ArrowUp':
                    swipedUp();
                    break;
                case 'ArrowDown':
                    swipedDown();
                    break;
                default:
            }
        };
        document.addEventListener("keydown", eventsSwitchFunc);

        const react2048Container = document.getElementById('react2048Container');
        react2048Container.addEventListener('touchstart', handleTouchStart, false);
        react2048Container.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    /* left swipe */
                    swipedLeft();
                } else {
                    /* right swipe */
                    swipedRight();
                }
            } else {
                if (yDiff > 0) {
                    /* up swipe */
                    swipedUp();
                } else {
                    /* down swipe */
                    swipedDown();
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };



        return () => {
            document.removeEventListener("keydown", eventsSwitchFunc);
            react2048Container.removeEventListener('touchstart', handleTouchStart, false);
            react2048Container.removeEventListener('touchmove', handleTouchMove, false);
        }
    });

    return (
        <>
            <Container className="heading-container">
                <Row>
                    <Col>
                        <h1>2048</h1>
                    </Col>
                    <Col>
                        <div className="score-container">
                            <div className="score-panel">
                                <p>SCORE</p>
                                <span className="score">{score.score}</span>
                            </div>
                            {score.scoreAdded ? <p className="score-added">+<span>{score.scoreAdded}</span></p> : null}
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="react-2048-container" id="react2048Container">
                <Row className="row-panel">
                    {
                        matrix.map((rowArray, rowId) => {
                            return rowArray.map((rowValue, valueId) => {
                                return (
                                    <Col xs={3} className="number-container" key={rowId + '' + valueId}>
                                        <div className="number-panel" style={numberColors[rowValue]}>{rowValue ? rowValue : ''}</div>
                                    </Col>
                                )
                            })
                        })
                    }
                </Row>
            </div>
        </>
    );
}

export default App;
