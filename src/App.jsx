import React from "react"
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
import { useState } from "react"

const { Title, Text, Paragraph } = Typography
const { Dragger } = Upload

function App() {
  const props = {
    name: "file",
    multiple: true,
    action: "/",
    required: true,
    onChange(info) {
      const { status } = info.file
      if (status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  const [isDisable, setIsDisable] = useState(true)

  const accountHandler = (e) => {
    if (e.target.value !== "") setIsDisable(false)
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
                        name="full_name"
                        label="Nama Lengkap"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nama Lengkap" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="spouse_name"
                        label="Nama Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nama Pasangan" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="dob"
                        label="Tanggal Lahir"
                        rules={[{ required: true }]}
                      >
                        <DatePicker placeholder="Pilih Tanggal" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="dob_spouse"
                        label="Tanggal Lahir Pasangan"
                        rules={[{ required: true }]}
                      >
                        <DatePicker placeholder="Pilih Tanggal" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="father_name"
                        label="Nama Ayah"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nama Ayah" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="spouse_father_name"
                        label="Ayah Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Ayah Pasangan" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="mother_name"
                        label="Nama Ibu"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nama Ibu" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="spouse_mother_name"
                        label="Nama Ibu Pasangan"
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Nama Ibu Pasangan" />
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
                    <DatePicker placeholder="Pilih Tanggal" />
                  </Form.Item>
                  <Form.Item
                    name="wedding_location"
                    label="Lokasi Pernikahan"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Salin URL Google Maps" />
                  </Form.Item>
                  <Form.Item
                    label="Unggah Foto"
                    name="pic"
                    rules={[{ required: true }]}
                  >
                    <Dragger {...props}>
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
                    name="account_number"
                    label={
                      <div className="gap-2">
                        <span>Nomor Rekening </span>
                        <Text type="danger"> (opsional)</Text>
                      </div>
                    }
                  >
                    <InputNumber
                      min={1}
                      max={16}
                      className="w-[200px]"
                      controls={false}
                      placeholder="No. Rekening"
                      onChange={accountHandler}
                    />
                  </Form.Item>
                  <Form.Item
                    name="pic"
                    label="Atas Nama Rekening"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Atas Nama Rekening"
                      disabled={isDisable ? true : false}
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
                    <Input placeholder="Salin URL Youtube" />
                  </Form.Item>
                </div>
                <div className="py-4">
                  <Form.Item>
                    <Button className="bg-white">Submit</Button>
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
