import React from 'react'

const MissionKey = (props) => {
    return (
        <div className="my-5">
            <p>
                <span className="px-3 mr-2 bg-success"/> - {props.success}
                </p>
                <p>
                <span className="px-3 mr-2 bg-danger"/> - {props.fail}
                </p>
                <p>
                <span className="px-3 mr-2 bg-warning" />
                - {props.progress}
              </p>
        </div>
    )
}

export default MissionKey;