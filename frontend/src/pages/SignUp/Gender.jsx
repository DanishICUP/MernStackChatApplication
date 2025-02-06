import React from 'react'

const Gender = ({ OnCheckBoxChange, slectGender }) => {
    return (
        <div className='flex mt-3 gap-2'>

            <div className="form-control">
                <label className={`cursor-pointer label gap-2 ${slectGender === 'male' ? "slected" : ""}`}>
                    <span className="label-text">Male</span>
                    <input type="checkbox"

                        className="checkbox checkbox-success"
                        checked={slectGender === 'male'}
                        onChange={() => OnCheckBoxChange('male')}
                    />
                </label>
            </div>

            <div className="form-control">
            <label className={`cursor-pointer label gap-2 ${slectGender === 'female' ? "slected" : ""}`}>
                    <span className="label-text">Female</span>
                    <input type="checkbox"

                        className="checkbox checkbox-success"
                        checked={slectGender === "female"}
                        onChange={() => OnCheckBoxChange("female")}
                    />
                </label>
            </div>
        </div>


    )
}

export default Gender