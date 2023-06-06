import React from "react"
import { useState } from "react"
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Typography,
  Upload,
} from "antd"
import InboxOutlined from "@ant-design/icons/InboxOutlined"
import moment from "moment/moment"

const { Title, Text, Paragraph } = Typography
const { Dragger } = Upload

function App() {
  const [fullName, setFullName] = useState("")
  const [spouseName, setSpouseName] = useState("")
  const [dob, setDob] = useState(null)
  const [dobSpouse, setDobSpouse] = useState(null)
  const [fatherName, setFatherName] = useState("")
  const [spouseFatherName, setSpouseFatherName] = useState("")
  const [motherName, setMotherName] = useState("")
  const [spouseMotherName, setSpouseMotherName] = useState("")
  const [weddingDate, setWeddingDate] = useState(null)
  const [weddingLocation, setWeddingLocation] = useState("")
  const [accountNumber, setAccountNumber] = useState(null)
  const [accountName, setAccountName] = useState("")
  const [audiolink, setAudiolink] = useState("")
  const [fileList, setFileList] = useState([])

  const props = {
    name: "file",
    multiple: true,
    action: "/",
    required: true,
    onChange(info) {
      handleFileChange(info)
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} uploaded.`)
      } else if (status === "error") {
        message.error(`${info.file.name} upload failed.`)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  const accountHandler = (e) => {
    const { value } = e.target
    setAccountNumber(value)
  }

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList)
  }

  const dateParser = ({ $D, $M, $y }) => `${$D}-${$M + 1}-${$y}`

  const handleDate = (date, setter) => {
    const dateString = dateParser(date)
    setter(dateString)
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf("day")
  }

  const handleSubmit = () => {
    const data = {
      fullName,
      spouseName,
      dob,
      dobSpouse,
      fatherName,
      spouseFatherName,
      motherName,
      spouseMotherName,
      weddingDate,
      weddingLocation,
      fileList,
      accountNumber,
      accountName,
      audiolink,
    }
    const requiredFields = [
      fullName,
      spouseName,
      fatherName,
      motherName,
      weddingDate,
      weddingLocation,
      accountName,
    ]
    const allFieldsAreFilled = requiredFields.every((field) => field)
    if (!allFieldsAreFilled) {
      message.error("Mohon lengkapi semua data yang diisi")
      return
    }
    sessionStorage.setItem("data", JSON.stringify(data))
  }

  return (
    <Row className="overflow-hidden">
      <Col span={8}>
        <div className="h-screen p-4">
          <div className="bg-slate-200 h-full rounded-tr-[3rem] flex items-center">
            <div className="flex px-4 justify-center align-center">
              <Form layout="vertical">
                <div className="p-4 h-[30rem] bg-white rounded-lg border overflow-y-scroll">
                  <div className="text-center">
                    <Title level={5}>Informasi Pribadi</Title>
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="Full Name"
                        label="Nama Lengkap"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Lengkap"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Nama Pasangan"
                        label="Nama Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Pasangan"
                          onChange={(e) => setSpouseName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Tanggal Lahir"
                        label="Tanggal Lahir"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          placeholder="Pilih Tanggal"
                          onChange={(date) => handleDate(date, setDob)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Tanggal Lahir Pasangan"
                        label="Tanggal Lahir Pasangan"
                        rules={[{ required: true }]}
                      >
                        <DatePicker
                          placeholder="Pilih Tanggal"
                          onChange={(date) => handleDate(date, setDobSpouse)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Nama Ayah"
                        label="Nama Ayah"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Ayah"
                          onChange={(e) => setFatherName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Nama Ayah Pasangan"
                        label="Nama Ayah Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Ayah Pasangan"
                          onChange={(e) => setSpouseFatherName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Nama Ibu"
                        label="Nama Ibu"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Ibu"
                          onChange={(e) => setMotherName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="Nama Ibu Pasangan"
                        label="Nama Ibu Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input
                          placeholder="Nama Ibu Pasangan"
                          onChange={(e) => setSpouseMotherName(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Title level={5} className="text-center">
                    Informasi Pernikahan
                  </Title>
                  <Form.Item
                    name="wedding_date"
                    label="Tanggal Pernikahan"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      placeholder="Pilih Tanggal"
                      onChange={(date) => handleDate(date, setWeddingDate)}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                  <Form.Item
                    name="wedding_location"
                    label="Lokasi Pernikahan"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Salin URL Google Maps"
                      onChange={(e) => setWeddingLocation(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Unggah Foto"
                    name="pic"
                    rules={[{ required: true }]}
                  >
                    <Dragger fileList={fileList} {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Klik atau seret file ke area ini untuk mengunggah
                      </p>
                    </Dragger>
                  </Form.Item>
                  <Divider />
                  <Title level={5} className="text-center">
                    Informasi Tambahan
                  </Title>
                  <Form.Item
                    name="No. Rekening"
                    label={
                      <div className="gap-2">
                        <span>Nomor Rekening </span>
                        <Text type="danger"> (opsional)</Text>
                      </div>
                    }
                    rules={[
                      {
                        type: "number",
                      },
                    ]}
                  >
                    <Input
                      className="w-[200px]"
                      placeholder="No. Rekening"
                      onChange={accountHandler}
                      value={accountNumber}
                    />
                  </Form.Item>
                  <Form.Item
                    name="pic"
                    label="Atas Nama Rekening"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Atas Nama Rekening"
                      disabled={accountNumber === ""}
                      onChange={(e) => setAccountName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="yt_link"
                    label={
                      <div className="gap-2">
                        <span>Tambahkan Audio Untuk Website</span>
                        <Text type="danger"> (opsional)</Text>
                      </div>
                    }
                  >
                    <Input
                      placeholder="Salin URL Youtube"
                      onChange={(e) => setAudiolink(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className="py-4">
                  <Form.Item>
                    <Button className="bg-white" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Col>
      <Col span={16}>
        <div className="h-screen p-4">
          <div
            className="rounded-bl-[3rem] p-8 h-full bg-cover flex items-end"
            style={{
              backgroundImage: "url(/bg.jpg)",
            }}
          >
            <div className="flex flex-col p-4 border rounded-bl-[2rem] bg-opacity-20 backdrop-blur-md">
              <Paragraph className="text-white text-xl">
                &#8223;Thanks for choosing us! Count on us for a seamless,
                personalized wedding website. Let's create a stunning online
                presence reflecting your unique love story!&#8221;
              </Paragraph>
              <Paragraph className="text-white text-lg">
                Soft-Tech Team
              </Paragraph>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default App
