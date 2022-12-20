import axios from 'axios';

export const sendEmaiConfirmation = async(formData: Record<string, any>) => {
  try {
    const data = await axios.post(`http://localhost:5500/sendEmail/confirmation`, {
      eventData: formData,
    });
    console.log("email data",data);
  } catch (error) {
    console.log(error);
  }
}