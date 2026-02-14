"use client";
import Link from "next/link";
import { Scale, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-20 pb-10 border-t">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Firm Identity */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-gray-800" />
              <span className="text-xl font-serif font-semibold">
                Argentum Legal
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Established in 1979, providing litigation, corporate advisory,
              and dispute resolution services across India.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif font-semibold mb-4 text-gray-900">
              Firm
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/practice-areas">Practice Areas</Link></li>
              <li><Link href="/case-results">Case Results</Link></li>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/media">Media</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-semibold mb-4 text-gray-900">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-of-use">Terms of Use</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4 text-gray-900">
              Contact
            </h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1" />
                <div>
                  +91 99123 45678<br />
                  +91 98765 43210
                </div>
              </li>

              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                contact@Argentum.com
              </li>

              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <div>
                  New Delhi<br />
                  Ahmedabad<br />
                  Chennai<br />
                  Mumbai
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 text-center text-xs text-gray-500 leading-relaxed">
          <p>
            © 2025 Argentum Legal. All Rights Reserved.
          </p>
          <p className="mt-2 max-w-3xl mx-auto">
            As per the rules of the Bar Council of India, law firms are not
            permitted to solicit work or advertise. The information provided on
            this website is for informational purposes only and does not
            constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
