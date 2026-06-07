import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ContactPage.module.css";

import { sendContactMessage } from "../../services/contactService";

type ContactStatus =
  | "idle"
  | "success"
  | "error";

export default function ContactPage() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [status, setStatus] =
    useState<ContactStatus>(
      "idle"
    );

  function isValidEmail(
    value: string
  ) {
    return /\S+@\S+\.\S+/.test(
      value
    );
  }

  function isFormValid() {
    return (
      name.trim().length >= 2 &&
      isValidEmail(email) &&
      subject.trim().length >= 3 &&
      message.trim().length >= 10
    );
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const result =
        await sendContactMessage({
          email,
          date:
            new Date().toISOString(),
          heading: `${subject} | ${name}`,
          message,
        });

      if (result.success) {
        setStatus("success");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* HERO */}

      <section
        className={styles.hero}
      >
        <div
          className={
            styles.heroOverlay
          }
        />

        <div
          className={
            styles.heroContent
          }
        >
          <div
            className={
              styles.badge
            }
          >
            SOCCER FAN ZONE
          </div>

          <h1>
            Get In Touch
          </h1>

          <p>
            Questions,
            partnerships,
            media enquiries,
            technical support
            and fan feedback.
          </p>
        </div>
      </section>

      {/* BACK */}

      <div
        className={
          styles.backWrap
        }
      >
        <button
          className={
            styles.backButton
          }
          onClick={() =>
            navigate("/soccer")
          }
        >
          ← Back To Home
        </button>
      </div>

      {/* CONTACT TYPES */}

      <section
        className={
          styles.cardGrid
        }
      >
        <div
          className={
            styles.infoCard
          }
        >
          <h3>
            General
            Enquiries
          </h3>

          <p>
            Questions about
            Soccer Fan Zone
            and platform
            features.
          </p>
        </div>

        <div
          className={
            styles.infoCard
          }
        >
          <h3>
            Media & Press
          </h3>

          <p>
            Interviews,
            coverage requests
            and press
            opportunities.
          </p>
        </div>

        <div
          className={
            styles.infoCard
          }
        >
          <h3>
            Partnerships
          </h3>

          <p>
            Sponsorship,
            collaboration and
            commercial
            opportunities.
          </p>
        </div>

        <div
          className={
            styles.infoCard
          }
        >
          <h3>
            Support
          </h3>

          <p>
            Technical issues,
            bugs and account
            assistance.
          </p>
        </div>
      </section>

      {/* FORM */}

      <section
        className={
          styles.formSection
        }
      >
        <form
          onSubmit={
            handleSubmit
          }
          className={
            styles.form
          }
        >
          <h2>
            Send A Message
          </h2>

          <div
            className={
              styles.field
            }
          >
            <label>
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          </div>

          <div
            className={
              styles.field
            }
          >
            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />
          </div>

          <div
            className={
              styles.field
            }
          >
            <label>
              Subject
            </label>

            <input
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
            />
          </div>

          <div
            className={
              styles.field
            }
          >
            <label>
              Message
            </label>

            <textarea
              rows={8}
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
            />
          </div>

          {status ===
            "success" && (
            <div
              className={
                styles.success
              }
            >
              Message sent
              successfully.
            </div>
          )}

          {status ===
            "error" && (
            <div
              className={
                styles.error
              }
            >
              Unable to send
              message.
            </div>
          )}

          <button
            type="submit"
            disabled={
              !isFormValid() ||
              loading
            }
            className={
              styles.submitButton
            }
          >
            {loading
              ? "Sending..."
              : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
}